<template>
    <div>
        <list-crud :header="headers" :items="items" title="Cadastro de Itens"  @on-save="save" @on-remove="remove" />
    </div>
</template>

<script>
import Vue from 'vue'
import ListCrud from '../components/ListCrud'

export default {
    name: 'Items',
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
      remove(item) {
        if ('id' in item) {
          this.$http.delete(`/list/${item.id}.json`).then(res => console.log('delete res', res))
        }
      },
      save(item) {
        let payload = item.data
        let method = 'post'
        let url = '.json'
        if (item.action === 'edit') {
          method = 'patch'
          if (!item.data.newValue.id) return
          url = 'id' in item.data.newValue ? `/${item.data.newValue.id}.json` : url
          payload = item.data.newValue
        }
        payload.data = new Date()
        this.$http[method](`/items${url}`, { ...payload }).then(res => {
          if(item.action === 'save') {
            let payload = { 
              ...item.data,
              id: res.data.name
            }
            let index = this.items.indexOf(item.data)
            Vue.set(this.items, index, payload)
          }

        })
      }
    },
    mounted() {
        this.headers = [
          {
            text: 'Nome',
            align: 'start',
            sortable: true,
            value: 'name',
            type: {
              name: 'text',
              label: 'Nome'
            },
            default: '',
          },
          {
            text: 'Quantidade',
            align: 'start',
            sortable: true,
            value: 'quantity',
            type: {
              name: 'number',
              label: 'Quantidade'
            },
            default: '',
          },
          {
            text: 'Unidade de Medida',
            align: 'start',
            sortable: true,
            value: 'measure',
            type: {
              name: 'select',
              label: 'Selecione a medida'
            },
            content:  ['litro', 'quilo', 'pacote', 'unidade'],
            default: '',
          },
          {
            text: 'Ações',
            align: 'start',
            sortable: false,
            value: 'actions',
          }
        ]

        this.$http('items.json').then(res => {
          for (let prop in res.data) {
            let obj = { ...res.data[prop] }
            obj.id = prop
            this.items.push(obj)
          }
        })
    }
}
</script>
