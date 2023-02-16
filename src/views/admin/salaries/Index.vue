<script setup>
import moment from "moment";
import { reactive, ref } from "@vue/reactivity";
import { useSalaryStore } from "@/stores/salary.store";
import { useEmployeeStore } from "@/stores/employee.store";
import { computed, onMounted } from "vue";
import { TrashIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
import { Pagination } from "@/components/atoms";

const salaryStore = useSalaryStore();
const employeeStore = useEmployeeStore();

const form = reactive({
  currentPage: 1,
  pageSize: 10,
  isModal: false,
  _id: null,
  allowance: null,
  basic_sallary: null,
  employee_id: null,
  payday: null,
  notes: null,
});
const columns = reactive([
  {
    label: "No",
    name: "no",
  },
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Position",
    name: "position",
  },
  {
    label: "Basic Salary",
    name: "basic_sallary",
  },
  {
    label: "Allowance",
    name: "allowance",
  },
  {
    label: "Payday",
    name: "payday",
  },
  {
    label: "Notes",
    name: "notes",
  },
  {
    label: "Actions",
    name: "aksi",
  },
]);

onMounted(() => {
  salaryStore
    .fetchSalaries({
      pageNumber: form.currentPage,
      pageSize: form.pageSize,
    })
    .then((response) => {
      console.log(response);
    });
  employeeStore.fetchAllEmployees();
});

const getSalaries = computed(() => {
  return salaryStore.getSalaries;
});
const getEmployees = computed(() => {
  return employeeStore.getEmployees;
});

const handlePage = (page) => {
  form.currentPage = page;
  salaryStore.fetchSalaries({
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
    form.allowance =
    form.basic_sallary =
    form.employee_id =
    form.payday =
    form.notes =
      null;
};

const openEditModal = (data) => {
  form.isModal = true;
  form._id = data._id;
  form.allowance = data.allowance;
  form.basic_sallary = data.basic_sallary;
  form.employee_id = data.employee_id._id;
  form.payday = data.payday;
  form.notes = data.notes;
};

const addSalary = () => {
  const payload = {
    allowance: form.allowance,
    basic_sallary: form.basic_sallary,
    employee_id: form.employee_id,
    payday: form.payday,
    notes: form.notes,
  };
  console.log(payload);
  salaryStore.createSalary(payload).then((response) => {
    if (response) {
      form.currentPage = 1;
      salaryStore
        .fetchSalaries({
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

const editSalary = () => {
  const payload = {
    _id: form._id,
    data: {
      allowance: form.allowance,
      basic_sallary: form.basic_sallary,
      employee_id: form.employee_id,
      payday: form.payday,
      notes: form.notes,
    },
  };
  salaryStore.updateSalary(payload).then((response) => {
    if (response) {
      form.currentPage = 1;
      salaryStore
        .fetchSalaries({
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

const removeSalary = (id) => {
  salaryStore.deleteSalary({ id }).then((response) => {
    if (response) {
      form.currentPage = 1;
      salaryStore
        .fetchSalaries({
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
      Salaries
    </h1>
    <div class="overflow-x-auto px-2">
      <button
        @click="openAddModal"
        type="button"
        class="inline-flex my-2 justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
      >
        Add Salary
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
              v-if="getSalaries.data.results.length > 0"
              class="divide-y divide-gray-200 bg-white"
            >
              <tr
                v-for="(data, index) in getSalaries.data.results"
                :key="data.id"
              >
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                >
                  {{ (form.currentPage - 1) * form.pageSize + (index + 1) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ data.employee_id?.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ data.employee_id?.position_id?.name }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right"
                >
                  {{ data.basic_sallary }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right"
                >
                  {{ data.allowance }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ moment(data.payday).format("hh:mm - DD/MM/YYYY") }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ data.notes }}
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
                      @click="removeSalary(data._id)"
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
                      Sepertinya belum ada daftar gaji.
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
          :total="getSalaries.data.total"
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
                  {{ form._id ? "Update" : "Add" }} Salary
                </h3>
                <form @submit.prevent="addSalary" class="mt-8 mb-4 space-y-6">
                  <div>
                    <label
                      for="employee"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      Employee
                    </label>
                    <div class="mt-1">
                      <select
                        v-model="form.employee_id"
                        id="employee"
                        name="employee"
                        autocomplete="employee-name"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option disabled>Choose Option</option>
                        <option
                          v-for="employee in getEmployees.data"
                          :key="employee._id"
                          :value="employee._id"
                        >
                          {{ employee.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      for="allowance"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      Allowance
                    </label>
                    <div class="mt-1">
                      <input
                        id="allowance"
                        v-model="form.allowance"
                        name="allowance"
                        type="number"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="basic_sallary"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      Basic Salary
                    </label>
                    <div class="mt-1">
                      <input
                        id="basic_sallary"
                        v-model="form.basic_sallary"
                        name="basic_sallary"
                        type="number"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="paydar"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      Payday
                    </label>
                    <div class="mt-1">
                      <input
                        id="payday"
                        v-model="form.payday"
                        name="payday"
                        type="datetime-local"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="notes"
                      class="block text-sm text-left font-medium text-gray-700"
                    >
                      notes
                    </label>
                    <div class="mt-1">
                      <textarea
                        id="notes"
                        v-model="form.notes"
                        name="notes"
                        type="text"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      ></textarea>
                    </div>
                  </div>

                  <div
                    class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                  >
                    <button
                      v-if="form._id"
                      @click="editSalary"
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
