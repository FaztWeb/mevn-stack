<template>
  <div>

    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Items</h1>
        <router-link :to="{ name: 'CreateItem' }" class="btn btn-primary float-right mt-2">
          Create Item
        </router-link>
      </div>
    </div><br />

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <td>ID</td>
          <td>Item Name</td>
          <td>Item Price</td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items">
          <td>{{ item._id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <router-link :to="{ name: 'EditItem', params: {id: item._id} }" class="btn btn-primary">
              Edit
            </router-link>

            <button class="btn btn-danger" v-on:click="deleteItem(item._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      items: []
    }
  },

  created: function()
  {
    this.fetchItems();
  },

  methods: {
    fetchItems()
    {
      let uri = 'http://localhost:4000/items';
      this.axios.get(uri).then((response) => {
        this.items = response.data;
      });
    },
    deleteItem(id)
    {
      const response = confirm('are you sure you want to delete?');
      if (response) {
        let uri = 'http://localhost:4000/items/delete/'+id;
        this.items.splice(id, 1);
        this.axios.get(uri);
      }
    }
  }
}
</script>
