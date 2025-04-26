<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["update:page"]);

function nextPage() {
  emits("update:page", props.page + 1);
}

function prevPage() {
  if (props.page > 1) {
    emits("update:page", props.page - 1);
  }
}
</script>

<template>
  <div class="flex justify-between mt-4">
    <a
      href="#"
      class="text-blue-600 hover:underline flex items-center gap-1 disabled:opacity-50"
      :aria-disabled="page === 1"
      :tabindex="page === 1 ? -1 : 0"
      @click.prevent="prevPage"
      :class="{ 'pointer-events-none text-gray-400': page === 1 }"
    >
      <span aria-hidden="true">&#8592;</span> Previous
    </a>
    <a
      href="#"
      class="text-blue-600 hover:underline flex items-center gap-1 disabled:opacity-50"
      :aria-disabled="count < limit"
      :tabindex="count < limit ? -1 : 0"
      @click.prevent="nextPage"
      :class="{ 'pointer-events-none text-gray-400': count < limit }"
    >
      Next <span aria-hidden="true">&#8594;</span>
    </a>
  </div>
</template>
