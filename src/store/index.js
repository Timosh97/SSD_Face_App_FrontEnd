import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            count: 0,
            embeddings: null,
            current_image: new URL("../assets/image.jpg", import.meta.url).href,
            camera:false,
            file_upload: false,
        }
    },
    getters: {
        count: (state) => state.count,
        embeddings: (state) => state.embeddings,
        current_image: (state) => state.current_image,
        camera: (state) => state.camera,
        file_upload: (state) => state.file_upload,
    },
    mutations: {
        increment(state, value) {
            state.count += value;
        },
        set_embeddings(state, value) {
            state.embeddings = value;
        },
        set_image(state, image) {
            var reader = new FileReader();
            reader.onload = () => { 
                state.current_image = reader.result;
             };
            reader.readAsDataURL(image);
        },
        set_camera(state){
            state.camera = !state.camera;
        },
        set_file_upload(state, value){
            state.file_upload = value;
        }
    },
    actions: {
        increment({ commit }, value) {
            commit('increment', value)
        },
        set_embeddings({ commit }, value) {
            value.bounding_boxes = JSON.parse(value.bounding_boxes);
            value.landmarks = JSON.parse(value.landmarks);
            value.latent_features = JSON.parse(value.latent_features);
            commit('set_embeddings', value);
        },
        set_file_upload({commit}, value){
            commit('set_file_upload', value);
        }
    }
});

export default store;