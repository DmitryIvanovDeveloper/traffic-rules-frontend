<script setup>
import ProjectSidebar from "@/modules/admin/projects/presentation/view/ProjectSidebar.vue";
import ProjectHeader from "@/modules/admin/projects/presentation/view/ProjectHeader.vue";

</script>

<template>
  <ProjectSidebar />

  <div
    class="flex flex-col !justify-start w-full items-center  min-h-screen  bg-[#E1EBEF]"
    style="background-image: url(&quot;path-to-wavy-background.png&quot;)"
  >
    <ProjectHeader />

    <div class="flex flex-col pt-[50px] w-full max-w-[500px]">
        <slot />
    </div>
    <div class="flex p-[50px] justify-end w-full">
        <slot name="buttons"/>
    </div>
  </div>
</template>
