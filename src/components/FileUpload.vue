<template>
  <div class="flex flex-col justify-center">
    <canvas id="canvas" ref="canvas" class="h-full w-full"
    v-if="canvas_state">

    </canvas>
    <input
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      type="file"
      id="formFile"
      ref="file"
      @change="sendPic"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      canvas_state: false,
      value: null,
      file_upload: false,
    };
  },
  watch: {},
  methods: {
    ...mapMutations(["set_image", "set_camera"]),
    ...mapActions(["increment", "set_embeddings"]),
    sendPic(e) {
      var files = e.target.files;
      if (!files.length) return;
      this.set_image(files[0]);
      let fd = new FormData();
      fd.append("image", files[0]);
      axios
        .post("http://127.0.0.1:5000/embeddings", fd)
        .then((response) => {
          console.log(response.data);
          this.set_embeddings(response.data);
          this.set_image(files[0]);
          // Next step
          // Showing the canvas
          this.set_camera();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
