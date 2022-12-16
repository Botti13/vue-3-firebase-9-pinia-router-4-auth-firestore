<template>
    <div>
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>
        <add-form></add-form>
        <p v-if="databaseStore.loadingDoc">Loading docs...</p>
        <a-space direction="vertical" v-if="!databaseStore.loadingDoc" style="width: 100%">
            <a-card v-for="item of databaseStore.documents" :key=item.id :title="item.short">
                <template #extra>
                    <a-space>
                        <a-popconfirm title="¿Estás seguro que deseas eliminar?" ok-text="Sí" cancel-text="No"
                            @confirm="confirm(item.id)" @cancel="cancel">
                            <a-button danger :disabled="databaseStore.loading"
                                :loading="databaseStore.loading">Eliminar</a-button>
                        </a-popconfirm>
                        <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                    </a-space>
                </template>
                <p>{{ item.name }}</p>
            </a-card>
        </a-space>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';
import { async } from '@firebase/util';

const userStore = useUserStore()
const databaseStore = useDatabaseStore()
const router = useRouter()

databaseStore.getUrls()

const confirm = async (id) => {
    const error = await databaseStore.deleteUrl(id)
    if (!error) return message.success('Eliminada exitosamente 👍')
    return message.error(error)
}

const cancel = () => {
    message.error('No se eliminó 👎')
}

</script>