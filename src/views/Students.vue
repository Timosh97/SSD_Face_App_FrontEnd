<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
  Switch,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import axios from "axios";

const active = ref(false);
const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const students = ref(null);
let query = ref("");
const students_ids_names = ref(null);
const selected = ref(null);

let filteredPeople = computed(() =>
  query.value === ""
    ? people
    : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

let filteredStudents = computed(() =>
  query.value === ""
    ? students_ids_names.value
    : students_ids_names.value.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const fetchStudents = async () => {
  return await axios
    .get("http://127.0.0.1:3001/students")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeAccessServer = async (_id, which, value) => {
  await axios
    .post("http://127.0.0.1:3001/change_access", {
      _id: _id,
      which: which,
      value: value,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
const changeAccess = async (idx, id, which_access) => {
  switch (which_access) {
    case "lecture":
      students.value[idx].lecture_access = !students.value[idx].lecture_access;
      await changeAccessServer(id, 0);
      break;
    case "lab":
      students.value[idx].lab_access = !students.value[idx].lab_access;
      await changeAccessServer(id, 1);
      break;
    case "library":
      students.value[idx].library_access = !students.value[idx].library_access;
      await changeAccessServer(id, 2);
      break;
    default:
      console.log("error");
  }
};

watch(selected, async (student) => {
  let response = await axios.post(
    "http://127.0.0.1:3001/student_compare_distances",
    {
      _id: student._id,
    }
  );
  let temp = response.data;
  temp.sort((a, b) => {
    return a.distance - b.distance;
  });
  students.value = temp;
});

onMounted(async () => {
  students.value = await fetchStudents();
  students_ids_names.value = students.value.map((e) => {
    return {
      _id: e._id,
      name: `${e.first_name} ${e.last_name}`,
    };
  });
  selected.value = students_ids_names.value[0];
});
</script>

<template>
  <div class="h-screen flex items-center" style="background-color: #3592a2">
    <div
      class="h-5/6 flex-auto bg-white rounded-lg border border-gray-200 shadow py-10"
    >
      <div class="flex flex-col items-center pb-10">
        <img
          class="mb-3 w-16 h-16 rounded-full shadow-lg"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="Bonnie image"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Bonnie Green
        </h5>
      </div>

      <div
        class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800"
      >
        <ul class="space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3 text-sm">Fee Statement</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap text-sm"
                >Students</span
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap text-sm">Sign In</span>
            </a>
          </li>
          <li>
            <a
              @click="this.$router.push('/')"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span
                class="flex-1 ml-3 whitespace-nowrap text-sm"
                >Sign Up</span
              >
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="h-5/6 rounded-lg shadow bg-white p-10 flex flex-col flex-auto mx-1"
    >
      <div>
        <h3 class="font-semibold text-lg" style="color: #3592a2">Students</h3>
      </div>
      <div class="flex justify-between">
        <div class="flex items-center">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                All categories
                <ChevronDownIcon
                  class="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-xs',
                      ]"
                      >Full access</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-xs',
                      ]"
                      >Lectures</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-xs',
                      ]"
                      >Labs</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-xs',
                      ]"
                      >Library</a
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <Combobox
            v-if="selected"
            v-model="selected"
            class="mx-3 hidden sm:block z-50"
          >
            <div class="relative">
              <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-xs shadow border border-gray-300"
              >
                <ComboboxInput
                  class="w-full border-none outline-none py-2 pl-5 text-xs leading-5 text-gray-900 shadow"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
                />
                <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
                >
                  <SelectorIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </ComboboxButton>
              </div>
              <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
              >
                <ComboboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs"
                >
                  <div
                    v-if="filteredStudents.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                  >
                    Nothing found.
                  </div>

                  <ComboboxOption
                    v-for="person in filteredStudents"
                    as="template"
                    :key="person._id"
                    :value="person"
                    v-slot="{ selected, active }"
                  >
                    <li
                      class="relative cursor-default select-none py-2 pl-10 pr-4"
                      :class="{
                        'bg-teal-600 text-white': active,
                        'text-gray-900': !active,
                      }"
                    >
                      <span
                        class="block truncate"
                        :class="{
                          'font-medium': selected,
                          'font-normal': !selected,
                        }"
                      >
                        {{ person.name }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{
                          'text-white': active,
                          'text-teal-600': !active,
                        }"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
        <div class="hidden sm:block">
          <div
            class="px-6 py-3 rounded text-xs text-white cursor-pointer"
            style="background-color: #036d84"
          >
            <span>Approve</span>
          </div>
        </div>
      </div>
      <div class="h-full w-full rounded-lg mt-5">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-xs text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">First name</th>
                <th scope="col" class="px-6 py-3">Last name</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Lecture Access</th>
                <th scope="col" class="px-6 py-3">Lab Access</th>
                <th scope="col" class="px-6 py-3">Library Access</th>
                <th scope="col" class="px-6 py-3">Distance</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="(student, index) in students"
                :key="index"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {{ student.first_name }}
                </th>
                <td class="px-6 py-4">
                  {{ student.last_name }}
                </td>
                <td class="px-6 py-4">{{ student.email }}</td>
                <td class="px-6 py-4">
                  <div
                    :class="
                      student.lecture_access ? 'bg-teal-900' : 'bg-teal-700'
                    "
                    class="relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    @click="changeAccess(index, student._id, 'lecture')"
                  >
                    <span
                      aria-hidden="true"
                      :class="
                        student.lecture_access
                          ? ' translate-x-5'
                          : 'translate-x-0'
                      "
                      class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                    />
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    :class="student.lab_access ? 'bg-teal-900' : 'bg-teal-700'"
                    class="relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    @click="changeAccess(index, student._id, 'lab')"
                  >
                    <span
                      aria-hidden="true"
                      :class="
                        student.lab_access ? ' translate-x-5' : 'translate-x-0'
                      "
                      class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                    />
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    :class="
                      student.library_access ? 'bg-teal-900' : 'bg-teal-700'
                    "
                    class="relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    @click="changeAccess(index, student._id, 'library')"
                  >
                    <span
                      aria-hidden="true"
                      :class="
                        student.library_access
                          ? ' translate-x-5'
                          : 'translate-x-0'
                      "
                      class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                    />
                  </div>
                </td>
                <td class="px-6 py-4" v-if="student.distance">
                  <span class="font-bold">{{ student.distance }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- {{ students }} -->
    </div>
    <div class="h-5/6 flex flex-col flex-auto">
      <div class="w-full bg-white rounded-lg border shadow-md p-4">
        <div class="flex justify-between items-center mb-4">
          <h5
            class="text-xl font-bold leading-none text-gray-900 dark:text-white"
          >
            Latest Customers
          </h5>
          <a
            href="#"
            class="text-xs font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-xs font-medium text-gray-900 truncate dark:text-white"
                  >
                    Neil Sims
                  </p>
                  <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  $320
                </div>
              </div>
            </li>
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Bonnie image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-xs font-medium text-gray-900 truncate dark:text-white"
                  >
                    Bonnie Green
                  </p>
                  <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  $3467
                </div>
              </div>
            </li>
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Michael image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-xs font-medium text-gray-900 truncate dark:text-white"
                  >
                    Michael Gough
                  </p>
                  <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  $67
                </div>
              </div>
            </li>
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Lana image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-xs font-medium text-gray-900 truncate dark:text-white"
                  >
                    Lana Byrd
                  </p>
                  <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  $367
                </div>
              </div>
            </li>
            <li class="pt-3 pb-0 sm:pt-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Thomas image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-xs font-medium text-gray-900 truncate dark:text-white"
                  >
                    Thomes Lean
                  </p>
                  <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  $2367
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
