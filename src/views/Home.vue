<template>
  <div class="h-full andred:h-screen w-full p-10 bg-primary">
    <div
      class="bg-white flex flex-col andred:flex-row items-center md:justify-center andred:justify-start andred:bg-img h-full w-full shadow-lg rounded-lg"
    >
      <div
        class="h-full w-full sm:w-10/12 md:w-1/2 p-3 andred:px-8 andred:py-16"
      >
        <Auth></Auth>
      </div>
      <div class="w-10/12 md:w-5/12 my-3 flex flex-col" v-if="camera">
        <video id="player" ref="player" class="h-full w-full" autoplay></video>
        <div
          class="text-white bg-blue-500 px-4 py-2 rounded flex self-start cursor-pointer"
          @click="captureFrame"
        >
          <span>Snap</span>
        </div>
      </div>
      <div class="w-10/12 md:w-5/12" v-if="canvas_state">
        <canvas
          id="canvas"
          ref="canvas"
          class="h-full w-full border border-green-500"
        ></canvas>
      </div>
      <!-- <div v-if="file_upload">
        <img :src="current_image" alt="">
      </div> -->
    </div>
  </div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
import Auth from "../components/Auth.vue";
import fileUpload from "../components/FileUpload.vue";

import { mapGetters, mapActions, mapMutations } from "vuex";
import { nextTick } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      player: null,
      constraints: {
        video: true,
      },
      canvas_state: false,
      h_ratio: null,
      w_ratio: null,
      myFiles: null,
    };
  },
  components: {
    Dashboard,
    Auth,
    fileUpload,
  },
  methods: {
    ...mapActions(["set_embeddings"]),
    ...mapMutations(["set_camera", "set_image"]),
    imageToServer(image) {
      let fd = new FormData();
      fd.append("image", image);
      axios
        .post("http://127.0.0.1:5000/embeddings", fd)
        // .post("https://learning-uth.herokuapp.com/embeddings", fd)
        .then(async (response) => {
          this.set_embeddings(response.data);
          if (response.data) {
            this.drawEmbeddings(response.data);
          }
          this.eventBus.emit("set_nearest_email", { data: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    blobToFile(theBlob, fileName) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    },
    captureFrame() {
      this.canvas_state = true;
      this.$nextTick(() => {
        let canvas = this.$refs.canvas;
        let ctx = canvas.getContext("2d");
        canvas.height = this.player.videoHeight;
        canvas.width = this.player.videoWidth;
        ctx.drawImage(player, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          let file = this.blobToFile(blob, "snapshot");
          // let file2 = new File([blob], "file_name", {lastModified: 1534584790000});
          this.imageToServer(file);
        }, "image/png");
        this.set_camera();
      });
    },
    drawPixel(points) {
      let canvas = this.$refs.canvas,
        ctx = canvas.getContext("2d"),
        canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      for (let i = 0; i < points.length; i++) {
        ctx.fillRect(points[i][0], points[i][1], 3, 3);
      }
    },
    drawEmbeddings(val) {
      if (val) {
        let old_h = val.old[1],
          old_w = val.old[0],
          new_w = this.player.videoWidth,
          new_h = this.player.videoHeight,
          h_ratio = new_h / old_h,
          w_ratio = new_w / old_w;
        if (val.bounding_boxes.length == 1) {
          if (val.bounding_boxes[0].length == 4) {
            let coords = val.bounding_boxes[0],
              top = coords[0],
              right = coords[1],
              bottom = coords[2],
              left = coords[3];
            let x = left,
              y = top,
              w = right - left,
              h = bottom - top;
            let new_x = Math.trunc(w_ratio * x),
              new_y = Math.trunc(h_ratio * y),
              new_w = Math.trunc(w_ratio * w),
              new_h = Math.trunc(h_ratio * h);
            let canvas = this.$refs.canvas;
            if (canvas.getContext) {
              var ctx = canvas.getContext("2d");
              ctx.beginPath();
              ctx.rect(new_x, new_y, new_w, new_h);
              ctx.strokeStyle = "red";
              ctx.lineWidth = "2";
              ctx.stroke();
            }
          }
          if (val.landmarks) {
            let temp = val.landmarks[0];
            let marks = [];
            for (let key in temp) {
              temp[key].map((e) => {
                marks.push([
                  Math.trunc(w_ratio * e[0]),
                  Math.trunc(h_ratio * e[1]),
                ]);
              });
              this.drawPixel(marks);
            }
          }
        } else {
          let canvas = this.$refs.canvas,
            ctx = canvas.getContext("2d");
          ctx.font = "48px serif";
          ctx.fillText("No face detected!", 10, 50);
        }
        this.h_ratio = h_ratio;
        this.w_ratio = w_ratio;
      }
    },
  },
  watch: {
    camera(val) {
      if (val) {
        this.$nextTick(() => {
          this.canvas_state = false;
          this.player = this.$refs.player;
          navigator.mediaDevices
            .getUserMedia(this.constraints)
            .then((stream) => {
              this.player.srcObject = stream;
            });
        });
      } else {
        if (this.player) {
          this.player.srcObject
            .getVideoTracks()
            .forEach((track) => track.stop());
        }
      }
    },
    embeddings() {
      console.log("Into watch embeddings");
    },
  },
  computed: {
    ...mapGetters(["camera", "current_image", "old_shape", "file_upload"]),
  },
};
</script>
<style scoped></style>
