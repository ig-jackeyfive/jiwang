<template>
    <el-container class="container">
        <el-header>选择要监控的网卡</el-header>
        <el-main>
            <el-table
                :data="tableData"
                stripe
                :show-header="false"
                style="width: 100%"
            >
                <el-table-column
                    prop="name"
                    label="网卡"
                    min-width="180"
                    align="center"
                >
                </el-table-column>

                <el-table-column
                    width="300"
                    label="操作"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-button @click="choose(scope.$index)">
                            选择
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-main>
    </el-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        HelloWorld,
    },
    data() {
        return {
            tableData: [
                {
                    name: "\\Device\\NPF_{17FB55BF-7C7F-4FA0-BF81-75CC3C402E69}[Microsoft]",
                },
                {
                    name: "\\Device\\NPF_{D7E4BEE0-66FC-41C9-9C49-847C7CA093E2}[Realtek Ethernet Controller]",
                },
                {
                    name: "\\Device\\NPF_{1E293A84-FC53-4A33-A2DC-B0316C1E0A53}[TAP-Windows Adapter V9]",
                },
            ],
        };
    },
    created() {
      this.$axios
            .post(`/web/showInformation`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // this.tableData = this.tableData.map((item) => {
        //     return {
        //         name: item,
        //     };
        // });
        console.log(this.tableData);
    },
    methods: {
        choose(id) {
            console.log("id", id);
            //开启监听
            // this.$axios
            //     .post(`/web/selectAdaptor?adaptorNum=${id}`)
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
            //跳转到监听页面
            this.$router.push(`/listen?id=${id}`)
        },
    },
};
</script>

<style>
.container {
    width: 100vw;
    height: 100vh;
    color: #fff;
}
.el-header,
.el-footer {
    background-color: #b3c0d1;
    /* color: #333; */
    font-size: 30px;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>
