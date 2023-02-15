<template>
  <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <!-- Heroicon name: outline/scale -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="truncate text-sm font-medium text-gray-500">
                Positions
              </dt>
              <dd>
                <div class="text-lg font-medium text-gray-900">5</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-5 py-3">
        <div class="text-sm">
          <router-link
            to="/admin/positions"
            class="font-medium text-cyan-700 hover:text-cyan-900"
          >
            View all
          </router-link>
        </div>
      </div>
    </div>
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <!-- Heroicon name: outline/scale -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="truncate text-sm font-medium text-gray-500">
                Employees
              </dt>
              <dd>
                <div class="text-lg font-medium text-gray-900">30</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-5 py-3">
        <div class="text-sm">
          <router-link
            to="/admin/employees"
            class="font-medium text-cyan-700 hover:text-cyan-900"
          >
            View all
          </router-link>
        </div>
      </div>
    </div>
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <!-- Heroicon name: outline/scale -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="truncate text-sm font-medium text-gray-500">
                Salaries
              </dt>
              <dd>
                <div class="text-lg font-medium text-gray-900">10</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-5 py-3">
        <div class="text-sm">
          <router-link
            to="/admin/salaries"
            class="font-medium text-cyan-700 hover:text-cyan-900"
          >
            View all
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
