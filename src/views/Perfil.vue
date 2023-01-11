<template>
    <h1 class="text-center">Perfil de usuario</h1>
    <!-- <p>{{ userStore.userData }}</p> -->
    <div class="text-center mb-5">
        <a-avatar :src="userStore.userData.photoURL" :size="150"></a-avatar>
    </div>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
            <a-form name="basicPerfil" autocomplete="off" layout="vertical" :model="userStore.userData"
                @finish="onFinish">
                <a-form-item name="email" label="Correo registrado (No modificable)"
                    :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa un email válido' }]">
                    <a-input disabled v-model:value="userStore.userData.email">
                    </a-input>
                </a-form-item>
                <a-form-item name="displayName" label="Ingrese su nombre de usuario"
                    :rules="[{ required: true, whitespace: true, message: 'Ingresa un nombre válido' }]">
                    <a-input v-model:value="userStore.userData.displayName">
                    </a-input>
                </a-form-item>
                <a-upload v-model:file-list="fileList" :before-upload="beforeUpload" list-type="picture" :max-count="1"
                    @change="handleChange">
                    <a-button>Subir foto de perfil</a-button>
                </a-upload>
                <a-form-item class="mt-5">
                    <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser"
                        :loading="userStore.loadingUser">
                        Actualizar información
                    </a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { message } from 'ant-design-vue';
import { ref } from 'vue';

const userStore = useUserStore()
const fileList = ref([])
const beforeUpload = (file) => {
    fileList.value = [...fileList.value, file];
    return false
}

const handleRemove = file => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};

const handleChange = info => {
    if (info.file.status !== 'uploading') {
        // console.log(info.file);
        const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Solo imágenes jpg o png');
            handleRemove(info.file)
        }
        const isLt1M = info.file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('Máximo 1MB!');
            handleRemove(info.file)
        }
        return isJpgOrPng && isLt1M;
    };
}

const onFinish = async () => {

    const error = await userStore.updateUser(userStore.userData.displayName, fileList.value[0])

    if (!error) {
        return message.success('Se actualizó tu nombre de usuario')
    }
    message.error('Ocurrió un error')
}


</script>

<style>
.mb-5 {
    margin-bottom: 2rem;
}

.mt-5 {
    margin-top: 2rem;
}
</style>
