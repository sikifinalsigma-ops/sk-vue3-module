<template>
    <el-container>
        <el-header>
            <f-header/>
        </el-header>
        <el-container>
            <el-aside>
                <f-menu></f-menu>
            </el-aside>
            <el-main>
                <f-tag-list/>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup lang="ts">
import FHeader from '@/pages/frame/component/Header.vue';
import FMenu from '@/pages/frame/component/Menu.vue';
import FTagList from '@/pages/frame/component/TagList.vue';
</script>