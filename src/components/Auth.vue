<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <CheckCircleIcon
                      class="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Student Account Found
                    </DialogTitle>
                    <div class="my-1 py-1 px-2">
                      <span class="bg-green-100 p-1 rounded"
                        >{{ data.email }} </span
                      >
                    </div>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        You are now being allowed into the student portal once
                        you click the SignIn button. Press cancel to decline
                        redicrect.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
              >
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="(open = false), toPortal()"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="open = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <div class="h-full w-full">
    <div class="text-gray-400 andred:text-white text-lg tracking-tight mb-10">
      <h1>Learn Auth System</h1>
    </div>
    <div>
      <div
        class="uppercase text-sm text-gray-400 andred:text-white font-semibold my-3"
      >
        <span v-if="loginSwitch">Welcome</span>
        <span v-else>Start for free</span>
      </div>
      <div v-if="!camera">
        <div v-if="loginSwitch">
          <div class="flex items-baseline">
            <span
              class="font-bold text-lg text-gray-400 andred:text-white mr-1 tracking-wider"
              >Sign In</span
            >
            <div class="h-2 w-2 rounded-full bg-blue-600"></div>
          </div>
          <div class="text-xs my-5">
            <span class="text-gray-300">New to here?</span>
            <span class="text-blue-600 cursor-pointer" @click="toggleLogin">
              Sign Up</span
            >
          </div>
        </div>
        <div v-else>
          <div class="flex items-baseline">
            <span
              class="font-bold text-lg text-gray-400 andred:text-white mr-1 tracking-wider"
              >Create new account</span
            >
            <div class="h-2 w-2 rounded-full bg-blue-600"></div>
          </div>
          <div class="text-xs my-5">
            <span class="text-gray-300">Already a member?</span>
            <span class="text-blue-600 cursor-pointer" @click="toggleLogin">
              Log in</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="my-4 rounded" v-if="camera">
      <input
        type="text"
        class="outline-none rounded bg-primary w-full h-7 text-black my-1"
        placeholder="Upload face to fill email"
        v-model="data.email"
        :disabled="true"
      />
    </div>
    <div class="text-sm w-full">
      <div v-if="!camera">
        <div class="flex justify-between my-5" v-if="!loginSwitch">
          <div class="flex flex-col flex-1 mx-1">
            <span class="text-white">First name</span>
            <input
              type="text"
              class="outline-none rounded bg-primary w-full h-7 text-black my-1"
              placeholder="Michal"
              v-model="data.first_name"
            />
          </div>
          <div class="flex flex-col flex-1 mx-1">
            <span class="text-white">Last name</span>
            <input
              type="text"
              class="outline-none rounded bg-primary w-full h-7 text-black my-1"
              placeholder="Maslak"
              v-model="data.last_name"
            />
          </div>
        </div>
        <div class="my-4 rounded">
          <span class="text-white">Email</span>
          <input
            type="text"
            class="outline-none rounded bg-primary w-full h-7 text-black my-1"
            :placeholder="
              !loginSwitch
                ? 'michal.maslak@anywhere.co'
                : 'Upload face to fill email'
            "
            v-model="data.email"
            :disabled="loginSwitch"
          />
        </div>
        <div class="flex items-start mb-6" v-if="loginSwitch">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              v-model="authenticated"
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <label for="remember" class="ml-2 text-sm font-bold text-white"
            >Authenticated</label
          >
        </div>
        <div class="my-4 rounded" v-else>
          <span class="text-white">Password</span>
          <input
            type="password"
            class="outline-none rounded bg-primary w-full h-7 text-black my-1"
            placeholder="*********"
            v-model="data.password"
            :disabled="loginSwitch"
          />
        </div>
      </div>
      <file-pond
        name="test"
        ref="pond"
        label-idle="Drop files here..."
        v-bind:allow-multiple="false"
        imageResizeTargetWidth="640"
        imageResizeTargetHeight="480"
        accepted-file-types="image/jpeg, image/jpg, image/png"
        v-bind:files="myFiles"
        v-bind:server="myServer"
        v-on:init="handleFilePondInit"
        imageResizeMode="force"
        v-else
      />
      <div class="flex w-full text-xs text-white">
        <div
          class="rounded bg-blue-500 mx-1 px-3 py-2 cursor-pointer"
          v-if="!loginSwitch"
          @click="createAccount"
        >
          <span>Create account</span>
        </div>
        <div class="rounded bg-blue-500 mx-1 px-3 py-2 cursor-pointer" v-else>
          <span>Sign In</span>
        </div>
        <div
          class="rounded bg-blue-500 mx-1 px-3 py-2 cursor-pointer"
          v-if="file_upload"
          @click="sendImageToServer"
        >
          <span>Use upload</span>
        </div>
        <div
          class="rounded bg-blue-500 mx-1 px-3 py-2 cursor-pointer"
          @click="set_camera"
        >
          <span v-if="!camera">Use camera instead?</span>
          <span v-else>Close camera</span>
        </div>
      </div>
    </div>
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
            if (results.email){
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
  mounted() {
    this.set_file_upload(false);
    this.eventBus.on("set_nearest_email", async (e) => {
      if (e.data.latent_features.length) {
        let results = await this.fetchNearestStudent(e.data.latent_features);
        this.data.email = results.email;
        this.open = true;
      }
    });
  }
};
</script>

<style></style>
