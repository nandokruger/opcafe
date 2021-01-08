<template>
    <div>
        <list-crud :header="headers" :items="list" title="Lista de Participantes"  @on-save="save" @on-remove="remove" />
    </div>
</template>

<script>
import Vue from 'vue'
import ListCrud from '../components/ListCrud'

export default {
    name: 'Lista',
    components: {
        ListCrud,
    },
    data() {
        return {
            headers: [],
            list: [],
            items: [],
        }
    },
    methods: {
      getHeaders() {
        this.headers = [
          {
            text: 'Nome',
            align: 'start',
            sortable: true,
            value: 'name',
            type: {
              name: 'text',
              label: 'Nome',
              validation: true
            },
            default: '',
            },
          {
            text: 'Item',
            align: 'start',
            sortable: true,
            value: 'items',
            type: {
              name: 'select',
              label: 'Selecione o Item',
              validation: true
            },
            content:  [ ...this.items ],
            default: '',
          },
          {
            text: 'Ações',
            align: 'start',
            sortable: false,
            value: 'actions',
          },
        ]
      },
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
        this.$http[method](`/list${url}`, { ...payload }).then(res => {
          if(item.action === 'save') {
            let payload = { 
              ...item.data,
              id: res.data.name
            }
            let index = this.list.indexOf(item.data)
            Vue.set(this.list, index, payload)
          }

        })
  
      }
    },
    mounted() {
      this.$http('list.json').then(res => {
        for (let prop in res.data) {
          let obj = { ...res.data[prop] }
          obj.id = prop
          this.list.push(obj)
        }
      })

      this.$http('items.json').then(res => {
        for (let prop in res.data) {
          const item = res.data[prop]
          let itemQuantity = item.quantity ? `(${item.quantity} ${item.measure})` : ''
          let itemName = `${item.name} ${itemQuantity}`
          this.items.push(itemName)
        }
        this.getHeaders()
      })
    }
}
</script>

<style>

</style>