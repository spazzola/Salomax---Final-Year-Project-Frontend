<template>
  <footer>
    <p>Copyright &copy; 2023 Rafal Szczotka P2549877</p>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #4abdac;
  color: #fffefe;
  font-weight: bold;
}

p {
  margin: 0;
}
</style>