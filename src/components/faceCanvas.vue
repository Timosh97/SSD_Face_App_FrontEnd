<template>
  <div class="h-full w-full">
    <div class="relative" ref="image_div" style="height: 300px; width: 400px">
      <img
        :src="current_image"
        ref="image"
        alt="current mage"
        class="h-full w-full"
      />
      <canvas class="absolute top-0 left-0" ref="canvas"></canvas>
      {{ embeddings }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      value: null,
    };
  },
  computed: {
    ...mapGetters(["current_image", "old_shape"]),
    embeddings() {
      // let val = this.$store.getters.embeddings;
      // if (val) {
      //   let old_h = val.old[1],
      //     old_w = val.old[0],
      //     new_w = 400,
      //     new_h = 300,
      //     h_ratio = new_h / old_h,
      //     w_ratio = new_w / old_w;
      //   if (val.bounding_boxes.length == 1) {
      //     if (val.bounding_boxes[0].length == 4) {
      //       let coords = val.bounding_boxes[0],
      //         top = coords[0],
      //         right = coords[1],
      //         bottom = coords[2],
      //         left = coords[3];
      //       let x = left,
      //         y = top,
      //         w = right - left,
      //         h = bottom - top;
      //       let new_x = Math.trunc(w_ratio * x),
      //         new_y = Math.trunc(h_ratio * y),
      //         new_w = Math.trunc(w_ratio * w),
      //         new_h = Math.trunc(h_ratio * h);
      //       let canvas = this.$refs.canvas;
      //       if (canvas.getContext) {
      //         var ctx = canvas.getContext("2d");
      //         ctx.beginPath();
      //         ctx.rect(new_x, new_y, new_w, new_h);
      //         ctx.strokeStyle = "red";
      //         ctx.lineWidth = "2";
      //         ctx.stroke();
      //       }
      //     }
      //   }
      // }
      return this.$store.getters.embeddings;
    },
  },
  watch: {},
  methods: {},
  mounted() {
    let canvas = this.$refs.canvas;
    canvas.width = 640;
    canvas.height = 480;
  },
};
</script>

<style></style>
