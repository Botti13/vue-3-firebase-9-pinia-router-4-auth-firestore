<template>
    <h1>Editar id: {{ route.params.id }}</h1>
    <p v-if="databaseStore.loadingDoc">Updating...</p>
    <a-form name="editform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
        <a-form-item name="url" label="Ingrese una URL" :rules="[{
            required: true,
            whitespace: true,
            pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: 'Ingrese una URL válida'
        }]">
            <a-input v-model:value="formState.url"></a-input>
        </a-form-item>

        <a-form-item>
            <a-space>
                <a-button type="primary" html-type="submit" :disabled="databaseStore.loading"
                    :loading="databaseStore.loading">Editar URL</a-button>
                <RouterLink to="/">
                    <a-button type="primary" :disabled="databaseStore.loading"
                        :loading="databaseStore.loading">Volver</a-button>
                </RouterLink>
            </a-space>
        </a-form-item>

    </a-form>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useDatabaseStore } from '../stores/database'
import { message } from 'ant-design-vue';


const databaseStore = useDatabaseStore()
const route = useRoute()
const formState = reactive({
    url: ''
})

const onFinish = async (value) => {
    console.log('Todo correcto y yo que me alegro ' + value)
    const error = await databaseStore.updateUrl(route.params.id, formState.url)

    if (!error) {
        formState.url = ''
        return message.success('URL editada 😉')
    }

    switch (error) {
        //Buscar errores de Firestore
        default:
            message.error('Ourrió un error en el servidor. Inténtelo más tarde 🥴')
            break
    }
}

onMounted(
    async () => {
        formState.url = await databaseStore.leerUrl(route.params.id)
    }
)

</script>
