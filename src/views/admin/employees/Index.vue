<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useEmployeeStore } from "@/stores/employee.store";
import { usePositionStore } from "@/stores/position.store";
import { computed, onMounted } from "vue";
import { TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
import { Pagination } from "@/components/atoms";

const employeeStore = useEmployeeStore();
const positionStore = usePositionStore();

const form = reactive({
  currentPage: 1,
  pageSize: 10,
  isModal: false,
  _id: null,
  nik: null,
  name: null,
  address: null,
  phone: null,
  email: null,
  position_id: null,
});
const columns = reactive([
  {
    label: "No",
    name: "no",
  },
  {
    label: "NIK",
    name: "nik",
  },
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Address",
    name: "address",
  },
  {
    label: "Phone",
    name: "phone",
  },
  {
    label: "Email",
    name: "email",
  },
  {
    label: "Position",
    name: "position_name",
  },
  {
    label: "Actions",
    name: "aksi",
  },
]);

onMounted(() => {
  employeeStore
    .fetchEmployees({
      pageNumber: form.currentPage,
      pageSize: form.pageSize,
    })
    .then((response) => {
      console.log(response);
    });
  positionStore.fetchAllPositions();
});

const getEmployees = computed(() => {
  return employeeStore.getEmployees;
});
const getPositions = computed(() => {
  return positionStore.getPositions;
});

const handlePage = (page) => {
  form.currentPage = page;
  employeeStore.fetchEmployees({
    pageNumber: page,
    pageSize: 10,
  });
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const openAddModal = () => {
  form.isModal = true;
  form._id =
    form.nik =
    form.name =
    form.address =
    form.phone =
    form.email =
    form.position_id =
      null;
};

const openEditModal = (data) => {
  form.isModal = true;
  form._id = data._id;
  form.nik = data.nik;
  form.name = data.name;
  form.address = data.address;
  form.phone = data.phone;
  form.email = data.email;
  form.position_id = data.position_id._id;
};

const addEmployee = () => {
  const payload = {
    nik: form.nik,
    name: form.name,
    address: form.address,
    phone: form.phone,
    email: form.email,
    position_id: form.position_id,
  };
  console.log(payload);
  employeeStore.createEmployee(payload).then((response) => {
    if (response) {
      form.currentPage = 1;
      employeeStore
        .fetchEmployees({
          pageNumber: form.currentPage,
          pageSize: form.pageSize,
        })
        .then((response) => {
          console.log(response);
        });
      form.isModal = false;
    } else {
      console.log("gagal");
    }
  });
};

const editEmployee = () => {
  const payload = {
    _id: form._id,
    data: {
      nik: form.nik,
      name: form.name,
      address: form.address,
      phone: form.phone,
      email: form.email,
      position_id: form.position_id,
    },
  };
  employeeStore.updateEmployee(payload).then((response) => {
    if (response) {
      form.currentPage = 1;
      employeeStore
        .fetchEmployees({
          pageNumber: form.currentPage,
          pageSize: form.pageSize,
        })
        .then((response) => {
          console.log(response);
        });
      form.isModal = false;
    } else {
      console.log("gagal");
    }
  });
};

const removeEmployee = (id) => {
  employeeStore.deleteEmployee({ id }).then((response) => {
    if (response) {
      form.currentPage = 1;
      employeeStore
        .fetchEmployees({
          pageNumber: form.currentPage,
          pageSize: form.pageSize,
        })
        .then((response) => {
          console.log(response);
        });
    } else {
      console.log("gagal");
    }
  });
};
</script>
<template>
  <div>
    <h1
      class="text-3xl mb-8 font-bold leading-tight tracking-tight text-gray-900"
    >
      Employees
    </h1>
    <div class="overflow-x-auto px-2">
      <button
        @click="openAddModal"
        type="button"
        class="inline-flex my-2 justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
      >
        Add Employee
      </button>
      <div class="inline-block min-w-full py-2 align-middle">
        <div
          class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="(column, index) in columns"
                  :key="index"
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody
              v-if="getEmployees.data?.results?.length > 0"
              class="divide-y divide-gray-200 bg-white"
            >
              <tr
                v-for="(data, index) in getEmployees.data.results"
                :key="data.id"
              >
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                >
                  {{ (form.currentPage - 1) * form.pageSize + (index + 1) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ data.nik }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ data.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ data.address }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ data.phone }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ data.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ data.position_id?.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="flex divide-x-2">
                    <button
                      @click="openEditModal(data)"
                      type="button"
                      class="pr-3"
                    >
                      <PencilSquareIcon
                        class="h-6 w-6 text-yellow-500 hover:opacity-80"
                      />
                    </button>
                    <button
                      @click="removeEmployee(data._id)"
                      type="button"
                      class="pl-3"
                    >
                      <TrashIcon
                        class="h-6 w-6 text-red-500 hover:opacity-80"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else class="divide-y divide-gray-200 bg-white">
              <tr>
                <td :colspan="columns.length" class="text-center px-4">
                  <div class="my-4 space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-gray-400 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h4 class="text-base font-semibold">
                      Sepertinya belum ada daftar karyawan.
                    </h4>
                    <p class="text-sm text-gray-500">
                      Klik tombol tambah untuk menambah data
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination
          :total="getEmployees.data.total"
          :perPage="form.pageSize"
          :currentPage="form.currentPage"
          @pagechanged="handlePage"
        />
      </div>
    </div>

    <!-- Add Modal -->
    <div
      v-if="form.isModal"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6"
          >
            <div>
              <div class="mt-3 text-center sm:mt-5">
                <h3
                  class="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  {{ form._id ? "Update" : "Add" }} Employee
                </h3>
                <form @submit.prevent="addEmployee" class="mt-8 mb-4 space-y-6">
                  <div>
                    <label
                      for="nik"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      NIK
                    </label>
                    <div class="mt-1">
                      <input
                        id="nik"
                        v-model="form.nik"
                        name="nik"
                        type="text"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="name"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div class="mt-1">
                      <input
                        id="name"
                        v-model="form.name"
                        name="name"
                        type="text"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="address"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div class="mt-1">
                      <textarea
                        id="address"
                        v-model="form.address"
                        name="address"
                        type="text"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <label
                      for="phone"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div class="mt-1">
                      <input
                        id="phone"
                        v-model="form.phone"
                        name="phone"
                        type="text"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div class="mt-1">
                      <input
                        id="email"
                        v-model="form.email"
                        name="email"
                        type="email"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      Position
                    </label>
                    {{ getPositions.data.results }}
                    <div class="mt-1">
                      <select
                        v-model="form.position_id"
                        id="position"
                        name="position"
                        autocomplete="position-name"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option disabled>Choose Option</option>
                        <option
                          v-for="position in getPositions.data"
                          :key="position._id"
                          :value="position._id"
                        >
                          {{ position.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                  >
                    <button
                      v-if="form._id"
                      @click="editEmployee"
                      type="button"
                      class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    >
                      Update
                    </button>
                    <button
                      v-else
                      type="submit"
                      class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    >
                      Save
                    </button>
                    <button
                      @click="form.isModal = false"
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
