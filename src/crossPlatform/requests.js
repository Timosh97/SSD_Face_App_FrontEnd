import Api from "../crossPlatform/Api";

export default {
  registerStudent(args) {
    return Api().post("register_student", args);
  },
  students() {
    return Api().post("signup", args);
  },
  user() {
    return Api().get("user");
  },
  createPost(args) {
    return Api().post("createPost", args);
  },
  getPosts() {
    return Api().get("posts");
  },
  removePost(id) {
    return Api().delete("posts/" + id);
  },
};
