<template>
  <nav
    class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
  >
    <div class="-mt-px w-0 flex-1 flex">
      <button
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        type="button"
        class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
      >
        <svg
          class="mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Previous
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <button
        v-for="page in pages"
        :key="page.name"
        @click="onClickPage(page)"
        :disabled="page.isDisabled"
        type="button"
        class="hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-bold"
        :class="
          page.name === currentPage
            ? 'border-blue-400 text-blue-400'
            : 'text-gray-500 border-transparent'
        "
      >
        {{ page.name }}
      </button>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <button
        @click="onClickNextPage"
        :disabled="isInLastPage"
        type="button"
        class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
      >
        Next
        <svg
          class="ml-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
    },
    perPage: Number,
    currentPage: {
      type: Number,
      default: 1,
    },
    maxVisibleButton: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.perPage);
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPage;
    },
    startPage() {
      if (this.currentPage > 0 && this.currentPage < this.maxVisibleButton)
        return 1;
      if (this.currentPage === this.totalPage)
        return this.totalPage - this.maxVisibleButton + 1;
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButton - 1, this.totalPage);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
  },
  methods: {
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page.name);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
  },
};
</script>
