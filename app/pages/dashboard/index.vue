<script lang="ts" setup>
const isSideBarOpened = ref(true);
const sideBarKey = "isSideBarOpened";

onMounted(() => {
  const sideBarValue = localStorage.getItem(sideBarKey) === "true";
  isSideBarOpened.value = sideBarValue;
});

function toggleSideBarOpened() {
  isSideBarOpened.value = !isSideBarOpened.value;

  localStorage.setItem(sideBarKey, isSideBarOpened.value.toString());
}
</script>

<template>
  <div class="flex flex-1">
    <div
      :class="{
        'w-42': isSideBarOpened,
        'w-14': !isSideBarOpened,
      }"
      class="flex flex-col bg-base-200 p-2"
    >
      <div class="p-2 cursor-pointer" @click="toggleSideBarOpened">
        <div :class="{ 'justify-end': isSideBarOpened }" class="flex tooltip tooltip-right" :data-tip="isSideBarOpened ? 'Collapse' : 'Expand'">
          <Icon v-if="isSideBarOpened" name="tabler:circle-chevron-left" size="24" />
          <Icon v-else name="tabler:circle-chevron-right" size="24" />
        </div>
      </div>
      <div class="flex flex-col mt-2 text-nowrap">
        <SideBarItem text="Locations" icon-name="tabler:location" href="/dashboard" :text-visible="isSideBarOpened" />
        <SideBarItem text="Add Location" icon-name="tabler:circle-plus" href="/dashboard/add" :text-visible="isSideBarOpened" />
        <div class="divider" :text-visible="isSideBarOpened" />
        <SideBarItem text="Sign Out" icon-name="tabler:logout" href="/sign-out" :text-visible="isSideBarOpened" />
      </div>
    </div>
    <div class="flex-1 p-4 ">
      Content
    </div>
  </div>
</template>
