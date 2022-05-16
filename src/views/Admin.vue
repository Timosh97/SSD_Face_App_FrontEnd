<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapMutations, mapGetters } from "vuex";
import Requests from "../crossPlatform/requests.js";

import axios from "axios";

import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/outline";

export default {
  data() {
    return {
      data: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        embeddings: null,
      },
      myFiles: null,
      file: null,
      myServer: {
        process: async (field, file, metadata, load) => {
          this.set_file_upload(true);
          this.file = file;
          load(Date.now());
        },
      },
      loginSwitch: false,
      authenticated: false,
      open: false,
    };
  },
  components: {
    FilePond,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    CheckCircleIcon,
  },
  methods: {
    ...mapActions(["set_embeddings", "set_file_upload"]),
    ...mapMutations(["set_camera", "set_image"]),
    async createAccount() {
      let data = this.data;
      if (!(data.first_name && data.last_name && data.email && data.password)) {
        console.log("Please fill all fields");
        return;
      }
      this.data.embeddings = this.$store.getters.embeddings;
      if (this.data.embeddings) {
        console.log("Face embeddings set!");
        let response = await Requests.registerStudent(this.data);
        this.$router.push("/students");
      } else {
        console.log("Face embeddings not set!");
      }
    },
    handleFilePondInit() {
      console.log("FilePond has initialized");
    },
    async imageToServer(image) {
      let fd = new FormData();
      fd.append("image", image);
      axios
        .post("http://127.0.0.1:5000/embeddings", fd)
        .then(async (response) => {
          this.set_embeddings(response.data);
          if (response.data.latent_features.length) {
            let results = await this.fetchNearestStudent(
              response.data.latent_features
            );
            this.data.email = results.email;
            if (results.email) {
              this.open = true;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async sendImageToServer() {
      let image = this.file;
      this.imageToServer(image);
      this.set_camera();
    },
    async fetchNearestStudent(input_embeddings) {
      return await axios
        .post("http://127.0.0.1:3001/nearest_student", {
          input_embeddings: input_embeddings,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toPortal() {
      this.$router.push("/students");
    },
    toggleLogin() {
      this.loginSwitch = !this.loginSwitch;
    },
  },
  computed: {
    ...mapGetters(["camera", "file_upload"]),
  },
  watch: {
    file_upload() {
      console.log("Into watch embeddings INNNNN");
    },
  },
  mounted() {},
};
</script>

<style></style>
