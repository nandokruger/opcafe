<template>
    <div>
        <list-crud :header="headers" :items="items" title="Lista" :exclude-key="['id']" @saved="saveDb" />
    </div>
</template>

<script>
import ListCrud from '../components/ListCrud'

export default {
    name: 'Home',
    components: {
        ListCrud,
    },
    data() {
        return {
            headers: [],
            items: [],
        }
    },
    methods: {
      saveDb(ob) {
        console.log('saved', ob)
      }
    },
    mounted() {
        this.headers = [
          {
            id: 1,
            text: 'Nome',
            align: 'start',
            sortable: true,
            value: 'nome',
            type: 'text',
            default: '',
            },
          {
            id: 2,
            text: 'Item',
            align: 'start',
            sortable: true,
            value: 'item',
            type: 'text',
            default: '',
          },
          {
            text: 'Actions',
            align: 'start',
            sortable: false,
            value: 'actions',
          },
        ]
        
        this.items = [
        {
          nome: 'Frozen Yogurdt',
          item: 9,
          fat: 6.0,
          fatList: ['fernando', 'ciclano', 'beltrano'],
          carbs: 24,
          protein: 4.0,
        },
        {
          nome: 'Ice cream sandwich',
          item: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          nome: 'Eclair',
          item: 2,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },


      ]
    }
}
</script>

<style>

</style>