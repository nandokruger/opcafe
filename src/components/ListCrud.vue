<template>
    <v-app id="inspire">
    <v-data-table
      :headers="header"
      :items="items"
      sort-by="calories"
      class="elevation-1"
      :footer-props="footerProps"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ title }}</v-toolbar-title>          
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >Novo Item</v-btn>
              <slot name="header"></slot>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              >
              <v-card-text>
                <v-container>
                  <v-row v-for="(field, index) in editFields" :key="index">
                    <v-col cols="12" sm="12" md="12" v-if="field.type.name == 'text' || field.type.name == 'number'">
                      <v-text-field :rules="field.type.name == 'text' ? textRules : numberRules" v-model="editedItem[field.value]" :label="field.text" :type="field.type.name" required></v-text-field>
                    </v-col>
                    
                    <v-col v-if="field.type.name == 'select'" cols="12" sm="12" md="12">
                      <v-select
                        v-model="editedItem[field.value]"
                        :items="field.content"
                        :rules="selectRules"
                        menu-props="auto"
                        :label="field.type.name ? field.type.label : 'Selecione'"
                        hide-details
                        single-line
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="validate">Salvar</v-btn>
              </v-card-actions>
            </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <span>Nenhum item adicionado</span>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
    name: 'ListCrud',
    props: {
      header: {
        type: Array,
        default: () => [
          {
            text: 'Column 1',
            align: 'start',
            sortable: false,
            value: 'col1',
            },
          {
            text: 'Column 2',
            align: 'start',
            sortable: false,
            value: 'col2',
          },
        ]
      },
      items: {
        type: Array,
        default: () => [
          {
            name: 'item1',
            items: ''

            },
          {
            name: 'item2',
            items: ''
          },
        ]
      }
       
    },
    data() {
      return {
        footerProps: {'items-per-page-text': 'Linhas por página'},
        dialog: false,
        title: '',
        headers: [],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            items: '',
            },
            defaultItem: {
              name: '',
              items: '',
        },
        valid: true,
        textRules: [
          v => !!v || 'Campo obrigatório',
          v => v.length >= 1 || 'Campo deve ter pelo menos 1 caracter',
        ],
        selectRules: [
          v => !!v || 'Campo obrigatório',
        ],
        numberRules: [
          v => !!v || 'Campo obrigatório',
        ]
      } 
    },

  computed: {

    formTitle () {
      return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
    },
    editFields() {
      let filtered = []
      let fields = {}
      console.log('this', this)
      this.header.forEach(header => {
        console.log('header', header)
        if(header.value !== 'actions') {
          fields = {
            text: header.text,
            value: header.value,
            type: header.type
          }
          if (header.type.name === 'select') {
            if ('content' in header) fields.content = header.content
          }
          filtered.push(fields)
        }
        
      })
      console.log('filtered', filtered)
      return filtered
    },
    editedKeys() {
      let editedKeys = []
      
      Object.keys(this.editedItem).forEach(key => {
        editedKeys.push({ 
          key,

        })
      })
      return editedKeys
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  created () {
    console.log('this', this)
    this.initialize()
    this.$http.get('usuarios.json').then(res => console.log('res1', res))
  },

  methods: {
      validit(value) {
      if (value) {
        console.log('valuue', value)
        switch(value.type.name) {
          case 'text':
            console.log('text this.editedItem', this.editedItem)
            return (
              !!this.editedItem.name || 'Campo obrigatório',
              this.editedItem.name.length >= 1 || 'Campo deve ter pelo menos 1 caracteres'
            )
          case 'select':
            console.log('select this.editedItem', this.editedItem)
            return (
              !!this.editedItem.items || 'Campo obrigatório')

        }
      }
      return true
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.save()
      }
      
    },
    initialize () {
      this.title = this.$attrs.title ? this.$attrs.title : ''
      
    },
    editItem (item) {
      console.log('item edit', item)
      this.editedIndex = this.items.indexOf(item)
      console.log('editedIndex', this.editedIndex)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      console.log('item remove', item)
      const index = this.items.indexOf(item)
      if (confirm('Tem certeza que deseja deletar esse item?')) {
        console.log('removeok')
        this.items.splice(index, 1)
        this.$emit('on-remove', item)
      }
        
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      console.log('this', this)
      console.log('this.editedIndex', this.editedIndex)
      let response = ''
      if (this.editedIndex > -1) {
        response = {
          action: 'edit',
          data: {
            oldValue: { ...this.items[this.editedIndex] },
            newValue: this.editedItem
          }
        }
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        response = {
          action: 'save',
          data: this.editedItem
        }
        this.items.push(this.editedItem)
      }
      this.$emit('on-save', response)
      this.close()
    },
  },
}
</script>

<style>

</style>