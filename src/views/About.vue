<template>
    <el-container class="container">
        <el-header>
            <i
                class="el-icon-back"
                style="position:absolute;left:20px;top:15px;cursor:pointer"
                @click="$router.push('/')"
            ></i>
            流量监控
        </el-header>
        <el-main style="text-align:left">
            <el-badge
                :value="datas.length"
                class="item"
                style=""
            >
                <el-button size="small">总数</el-button>
            </el-badge>
            <div style="display:flex;flex-direction:column;width:100%;height:100%">
                <div style="height:400px">

                    <el-table
                        :data="datas"
                        :show-header="true"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        height="400"
                        style="width: 100%"
                    >
                        <!-- <el-table-column
                             type="index"
                            label="No."
                            min-width="180"
                            align="center"
                        >
                        </el-table-column>          
                                       -->

                        <el-table-column
                            prop="no"
                            label="No."
                            min-width="180"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="Time"
                            min-width="180"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="src"
                            label="Source"
                            min-width="180"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="dest"
                            label="Destination"
                            min-width="180"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="protocol"
                            label="Protocol"
                            min-width="180"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="length"
                            label="Length"
                            min-width="180"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="info"
                            label="Info"
                             min-width="180"
                            align="center"
                        >
                        </el-table-column>

                    </el-table>
                </div>
                <div style="margin-top:20px;flex:1">
                    <el-col
                        :span="12"
                        style="height:100%"
                    >
                        <el-card
                            class="box-card"
                            style="height:100%;overflow-y:scroll"
                        >
                            <div
                                class="text item"
                                style="white-space: pre-wrap;text-align:left"
                            >
                                {{key}}
                            </div>
                        </el-card>
                    </el-col>
                    <el-col
                        :span="12"
                        style="height:100%"
                    >
                        <el-card
                            class="box-card"
                            style="height:400px;overflow-y:scroll"
                        >
                            <div
                                class="text item"
                                style="white-space: pre-wrap;text-align:left"
                            >
                                {{value}}
                            </div>
                        </el-card>
                    </el-col>
                </div>
            </div>

        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            id: null,
            datas: [],
            timer: null,
            // 表格数据
            dataRaw: [
                {
                    no: 1,
                    time: "14:39:18:325   2021-12-24",
                    src: "192.168.1.106",
                    dest: "192.168.1.107",
                    protocol: "HTTP",
                    length: 255,
                    info: null,
                },
                {
                    no: 2,
                    time: "14:39:18:325   2021-12-24",
                    src: "192.168.1.106",
                    dest: "192.168.1.107",
                    protocol: "TCP",
                    length: 59,
                    info: "[ TCP incorrect: 0x1551]   8080->57451   [PUSH,ACK]  Seq=3108394640   Ack=946636792   Win=511   Len=5   ",
                },
                {
                    no: 3,
                    time: "14:39:18:384   2021-12-24",
                    src: "192.168.1.107",
                    dest: "192.168.1.106",
                    protocol: "TCP",
                    length: 54,
                    info: "57451->8080   [ACK]  Seq=946636792   Ack=3108394645   Win=510   Len=0   ",
                },
                {
                    no: 4,
                    time: "14:39:18:592   2021-12-24",
                    src: "112.65.193.150",
                    dest: "192.168.1.106",
                    protocol: "HTTPS",
                    length: 257,
                    info: "443->58135   [PUSH,ACK]  Seq=1029922987   Ack=1112830956   Win=251   Len=203   ",
                },
                {
                    no: 5,
                    time: "14:39:18:593   2021-12-24",
                    src: "192.168.1.106",
                    dest: "112.65.193.150",
                    protocol: "HTTPS",
                    length: 54,
                    info: "[ TCP incorrect: 0x7FF9]   58135->443   [FIN,ACK]  Seq=1112830956   Ack=1029923190   Win=515   Len=0   ",
                },
                {
                    no: 6,
                    time: "14:39:18:601   2021-12-24",
                    src: "112.65.193.150",
                    dest: "192.168.1.106",
                    protocol: "HTTPS",
                    length: 54,
                    info: "443->58135   [FIN,ACK]  Seq=1029923190   Ack=1112830956   Win=251   Len=0   ",
                },
                {
                    no: 7,
                    time: "14:39:18:601   2021-12-24",
                    src: "192.168.1.106",
                    dest: "112.65.193.150",
                    protocol: "HTTPS",
                    length: 54,
                    info: "[ TCP incorrect: 0x7FF8]   58135->443   [ACK]  Seq=1112830957   Ack=1029923191   Win=515   Len=0   ",
                },
                {
                    no: 8,
                    time: "14:39:18:637   2021-12-24",
                    src: "112.65.193.150",
                    dest: "192.168.1.106",
                    protocol: "HTTPS",
                    length: 54,
                    info: "443->58135   [ACK]  Seq=1029923191   Ack=1112830957   Win=251   Len=0   ",
                },
                {
                    no: 9,
                    time: "14:39:19:366   2021-12-24",
                    src: "192.168.1.107",
                    dest: "192.168.1.106",
                    protocol: "TCP",
                    length: 55,
                    info: "57451->8080   [ACK]  Seq=946636791   Ack=3108394645   Win=510   Len=1   ",
                },
                {
                    no: 10,
                    time: "14:39:19:366   2021-12-24",
                    src: "192.168.1.106",
                    dest: "192.168.1.107",
                    protocol: "TCP",
                    length: 66,
                    info: "[ TCP incorrect: 0xA293]   8080->57451   [ACK]  Seq=3108394645   Ack=946636792   Win=511   Len=0   ",
                },
            ],
            //详情
            details: [
        {
          '\nFrame:\nFrame:                                  number = 0\nFrame:                               timestamp = 2021-12-24 15:09:42.258\nFrame:                             wire length = 255 bytes\nFrame:                         captured length = 255 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 241\nIp:                                       id = 0x6486 (25734)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0x0 (0) [incorrect: 0x115B]\nIp:                                   source = 192.168.1.106\nIp:                              destination = 192.168.1.107\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=20 \nTcp: \nTcp:                                   source = 8080\nTcp:                              destination = 58749\nTcp:                                      seq = 0x51E76A32 (1374120498)\nTcp:                                      ack = 0x9E92FDF6 (2660433398)\nTcp:                                     hlen = 5\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x18 (24)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 1... = [1] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 511\nTcp:                                 checksum = 0x8509 (34057) [incorrect: 0x4554]\nTcp:                                   urgent = 0\nTcp: \nHttp:  ******* Http offset=54 (0x36) length=162 protocol suite=TCP/IP\nHttp: \nHttp:                             CONTENT-TYPE = application/json\nHttp:                                     DATE = Fri, 24 Dec 2021 07:09:42 GMT\nHttp:                               CONNECTION = keep-alive\nHttp: \nData:  ******* Payload offset=216 (0xD8) length=39 \nData: \n00d8: 32 31 0d 0a  7b 22 6d 73  67 22 3a 22  e5 bc 80 e5    21..{"msg":"....\n00e8: a7 8b e7 9b  91 e5 90 ac  22 2c 22 63  6f 64 65 22    ........","code"\n00f8: 3a 32 30 30  7d 0d 0a                                 :200}..         \n':
            '0000:*e0 9d 31 da  37 57 dc 1b  a1 7e 0f db  08 00*45 00    ..1.7W...~....E.\n0010: 00 f1 64 86  40 00 80 06  00 00 c0 a8  01 6a c0 a8    ..d.@........j..\n0020: 01 6b*1f 90  e5 7d 51 e7  6a 32 9e 92  fd f6 50 18    .k..}Q.j2....P.\n0030: 01 ff 85 09  00 00*48 54  54 50 2f 31  2e 31 20 32    ......HTTP/1.1 2\n0040: 30 30 20 0d  0a 43 6f 6e  74 65 6e 74  2d 54 79 70    00 ..Content-Typ\n0050: 65 3a 20 61  70 70 6c 69  63 61 74 69  6f 6e 2f 6a    e: application/j\n0060: 73 6f 6e 0d  0a 54 72 61  6e 73 66 65  72 2d 45 6e    son..Transfer-En\n0070: 63 6f 64 69  6e 67 3a 20  63 68 75 6e  6b 65 64 0d    coding: chunked.\n0080: 0a 44 61 74  65 3a 20 46  72 69 2c 20  32 34 20 44    .Date: Fri, 24 D\n0090: 65 63 20 32  30 32 31 20  30 37 3a 30  39 3a 34 32    ec 2021 07:09:42\n00a0: 20 47 4d 54  0d 0a 4b 65  65 70 2d 41  6c 69 76 65     GMT..Keep-Alive\n00b0: 3a 20 74 69  6d 65 6f 75  74 3d 36 30  0d 0a 43 6f    : timeout=60..Co\n00c0: 6e 6e 65 63  74 69 6f 6e  3a 20 6b 65  65 70 2d 61    nnection: keep-a\n00d0: 6c 69 76 65  0d 0a 0d 0a* 32 31 0d 0a  7b 22 6d 73    live....21..{"ms\n00e0: 67 22 3a 22  e5 bc 80 e5  a7 8b e7 9b  91 e5 90 ac    g":"............\n00f0: 22 2c 22 63  6f 64 65 22  3a 32 30 30  7d 0d 0a*      ","code":200}.. \n',
        },
        {
          '\nFrame:\nFrame:                                  number = 1\nFrame:                               timestamp = 2021-12-24 15:09:42.258\nFrame:                             wire length = 59 bytes\nFrame:                         captured length = 59 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 45\nIp:                                       id = 0x6487 (25735)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0x0 (0) [incorrect: 0x121E]\nIp:                                   source = 192.168.1.106\nIp:                              destination = 192.168.1.107\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=20 \nTcp: \nTcp:                                   source = 8080\nTcp:                              destination = 58749\nTcp:                                      seq = 0x51E76AFB (1374120699)\nTcp:                                      ack = 0x9E92FDF6 (2660433398)\nTcp:                                     hlen = 5\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x18 (24)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 1... = [1] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 511\nTcp:                                 checksum = 0x8445 (33861) [incorrect: 0x870E]\nTcp:                                   urgent = 0\nTcp: \nData:  ******* Payload offset=54 (0x36) length=5 \nData: \n0036: 30 0d 0a 0d  0a                                       0....           \n':
            "0000:*e0 9d 31 da  37 57 dc 1b  a1 7e 0f db  08 00*45 00    ..1.7W...~....E.\n0010: 00 2d 64 87  40 00 80 06  00 00 c0 a8  01 6a c0 a8    .-d.@........j..\n0020: 01 6b*1f 90  e5 7d 51 e7  6a fb 9e 92  fd f6 50 18    .k..}Q.j.....P.\n0030: 01 ff 84 45  00 00*30 0d  0a 0d 0a*                   ...E..0....     \n",
        },
        {
          '\nFrame:\nFrame:                                  number = 2\nFrame:                               timestamp = 2021-12-24 15:09:42.447\nFrame:                             wire length = 66 bytes\nFrame:                         captured length = 66 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 52\nIp:                                       id = 0x9050 (36944)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0xE64D (58957) [correct]\nIp:                                   source = 192.168.1.107\nIp:                              destination = 192.168.1.106\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=32 \nTcp: \nTcp:                                   source = 58749\nTcp:                              destination = 8080\nTcp:                                      seq = 0x9E92FDF6 (2660433398)\nTcp:                                      ack = 0x51E76A32 (1374120498)\nTcp:                                     hlen = 8\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x10 (16)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 0... = [0] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 511\nTcp:                                 checksum = 0x1C1D (7197) [correct]\nTcp:                                   urgent = 0\nTcp: \nTcp: + NoOp: offset=20 length=1\nTcp:                                     code = 1\nTcp:                                   length = 1 [implied length from option type]\nTcp: ':
            "0000:*dc 1b a1 7e  0f db e0 9d  31 da 37 57  08 00*45 00    ...~....1.7W..E.\n0010: 00 34 90 50  40 00 80 06  e6 4d c0 a8  01 6b c0 a8    .4.P@....M...k..\n0020: 01 6a*e5 7d  1f 90 9e 92  fd f6 51 e7  6a 32 80 10    .j.}.....Q.j2..\n0030: 01 ff 1c 1d  00 00 01 01  05 0a 51 e7  6a fb 51 e7    ..........Q.j.Q.\n0040: 6b 00*                                                k.              \n",
        },
        {
          '\nFrame:\nFrame:                                  number = 3\nFrame:                               timestamp = 2021-12-24 15:09:42.497\nFrame:                             wire length = 260 bytes\nFrame:                         captured length = 260 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 246\nIp:                                       id = 0x6488 (25736)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0x0 (0) [incorrect: 0x1154]\nIp:                                   source = 192.168.1.106\nIp:                              destination = 192.168.1.107\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=20 \nTcp: \nTcp:                                   source = 8080\nTcp:                              destination = 58749\nTcp:                                      seq = 0x51E76A32 (1374120498)\nTcp:                                      ack = 0x9E92FDF6 (2660433398)\nTcp:                                     hlen = 5\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x18 (24)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 1... = [1] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 511\nTcp:                                 checksum = 0x850E (34062) [incorrect: 0x2B0B]\nTcp:                                   urgent = 0\nTcp: \nHttp:  ******* Http offset=54 (0x36) length=162 protocol suite=TCP/IP\nHttp: \nHttp:                             CONTENT-TYPE = application/json\nHttp:                                     DATE = Fri, 24 Dec 2021 07:09:42 GMT\nHttp:                               CONNECTION = keep-alive\nHttp: \nData:  ******* Payload offset=216 (0xD8) length=44 \nData: \n00d8: 32 31 0d 0a  7b 22 6d 73  67 22 3a 22  e5 bc 80 e5    21..{"msg":"....\n00e8: a7 8b e7 9b  91 e5 90 ac  22 2c 22 63  6f 64 65 22    ........","code"\n00f8: 3a 32 30 30  7d 0d 0a 30  0d 0a 0d 0a                 :200}..0....    \n':
            '0000:*e0 9d 31 da  37 57 dc 1b  a1 7e 0f db  08 00*45 00    ..1.7W...~....E.\n0010: 00 f6 64 88  40 00 80 06  00 00 c0 a8  01 6a c0 a8    ..d.@........j..\n0020: 01 6b*1f 90  e5 7d 51 e7  6a 32 9e 92  fd f6 50 18    .k..}Q.j2....P.\n0030: 01 ff 85 0e  00 00*48 54  54 50 2f 31  2e 31 20 32    ......HTTP/1.1 2\n0040: 30 30 20 0d  0a 43 6f 6e  74 65 6e 74  2d 54 79 70    00 ..Content-Typ\n0050: 65 3a 20 61  70 70 6c 69  63 61 74 69  6f 6e 2f 6a    e: application/j\n0060: 73 6f 6e 0d  0a 54 72 61  6e 73 66 65  72 2d 45 6e    son..Transfer-En\n0070: 63 6f 64 69  6e 67 3a 20  63 68 75 6e  6b 65 64 0d    coding: chunked.\n0080: 0a 44 61 74  65 3a 20 46  72 69 2c 20  32 34 20 44    .Date: Fri, 24 D\n0090: 65 63 20 32  30 32 31 20  30 37 3a 30  39 3a 34 32    ec 2021 07:09:42\n00a0: 20 47 4d 54  0d 0a 4b 65  65 70 2d 41  6c 69 76 65     GMT..Keep-Alive\n00b0: 3a 20 74 69  6d 65 6f 75  74 3d 36 30  0d 0a 43 6f    : timeout=60..Co\n00c0: 6e 6e 65 63  74 69 6f 6e  3a 20 6b 65  65 70 2d 61    nnection: keep-a\n00d0: 6c 69 76 65  0d 0a 0d 0a* 32 31 0d 0a  7b 22 6d 73    live....21..{"ms\n00e0: 67 22 3a 22  e5 bc 80 e5  a7 8b e7 9b  91 e5 90 ac    g":"............\n00f0: 22 2c 22 63  6f 64 65 22  3a 32 30 30  7d 0d 0a 30    ","code":200}..0\n0100: 0d 0a 0d 0a*                                          ....            \n',
        },
        {
          '\nFrame:\nFrame:                                  number = 4\nFrame:                               timestamp = 2021-12-24 15:09:42.8\nFrame:                             wire length = 260 bytes\nFrame:                         captured length = 260 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 246\nIp:                                       id = 0x6489 (25737)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0x0 (0) [incorrect: 0x1153]\nIp:                                   source = 192.168.1.106\nIp:                              destination = 192.168.1.107\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=20 \nTcp: \nTcp:                                   source = 8080\nTcp:                              destination = 58749\nTcp:                                      seq = 0x51E76A32 (1374120498)\nTcp:                                      ack = 0x9E92FDF6 (2660433398)\nTcp:                                     hlen = 5\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x18 (24)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 1... = [1] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 511\nTcp:                                 checksum = 0x850E (34062) [incorrect: 0x2B0B]\nTcp:                                   urgent = 0\nTcp: \nHttp:  ******* Http offset=54 (0x36) length=162 protocol suite=TCP/IP\nHttp: \nHttp:                             CONTENT-TYPE = application/json\nHttp:                                     DATE = Fri, 24 Dec 2021 07:09:42 GMT\nHttp:                               CONNECTION = keep-alive\nHttp: \nData:  ******* Payload offset=216 (0xD8) length=44 \nData: \n00d8: 32 31 0d 0a  7b 22 6d 73  67 22 3a 22  e5 bc 80 e5    21..{"msg":"....\n00e8: a7 8b e7 9b  91 e5 90 ac  22 2c 22 63  6f 64 65 22    ........","code"\n00f8: 3a 32 30 30  7d 0d 0a 30  0d 0a 0d 0a                 :200}..0....    \n':
            '0000:*e0 9d 31 da  37 57 dc 1b  a1 7e 0f db  08 00*45 00    ..1.7W...~....E.\n0010: 00 f6 64 89  40 00 80 06  00 00 c0 a8  01 6a c0 a8    ..d.@........j..\n0020: 01 6b*1f 90  e5 7d 51 e7  6a 32 9e 92  fd f6 50 18    .k..}Q.j2....P.\n0030: 01 ff 85 0e  00 00*48 54  54 50 2f 31  2e 31 20 32    ......HTTP/1.1 2\n0040: 30 30 20 0d  0a 43 6f 6e  74 65 6e 74  2d 54 79 70    00 ..Content-Typ\n0050: 65 3a 20 61  70 70 6c 69  63 61 74 69  6f 6e 2f 6a    e: application/j\n0060: 73 6f 6e 0d  0a 54 72 61  6e 73 66 65  72 2d 45 6e    son..Transfer-En\n0070: 63 6f 64 69  6e 67 3a 20  63 68 75 6e  6b 65 64 0d    coding: chunked.\n0080: 0a 44 61 74  65 3a 20 46  72 69 2c 20  32 34 20 44    .Date: Fri, 24 D\n0090: 65 63 20 32  30 32 31 20  30 37 3a 30  39 3a 34 32    ec 2021 07:09:42\n00a0: 20 47 4d 54  0d 0a 4b 65  65 70 2d 41  6c 69 76 65     GMT..Keep-Alive\n00b0: 3a 20 74 69  6d 65 6f 75  74 3d 36 30  0d 0a 43 6f    : timeout=60..Co\n00c0: 6e 6e 65 63  74 69 6f 6e  3a 20 6b 65  65 70 2d 61    nnection: keep-a\n00d0: 6c 69 76 65  0d 0a 0d 0a* 32 31 0d 0a  7b 22 6d 73    live....21..{"ms\n00e0: 67 22 3a 22  e5 bc 80 e5  a7 8b e7 9b  91 e5 90 ac    g":"............\n00f0: 22 2c 22 63  6f 64 65 22  3a 32 30 30  7d 0d 0a 30    ","code":200}..0\n0100: 0d 0a 0d 0a*                                          ....            \n',
        },
        {
          '\nFrame:\nFrame:                                  number = 5\nFrame:                               timestamp = 2021-12-24 15:09:42.845\nFrame:                             wire length = 66 bytes\nFrame:                         captured length = 66 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 52\nIp:                                       id = 0x9051 (36945)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0xE64C (58956) [correct]\nIp:                                   source = 192.168.1.107\nIp:                              destination = 192.168.1.106\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=32 \nTcp: \nTcp:                                   source = 58749\nTcp:                              destination = 8080\nTcp:                                      seq = 0x9E92FDF6 (2660433398)\nTcp:                                      ack = 0x51E76B00 (1374120704)\nTcp:                                     hlen = 8\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x10 (16)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 0... = [0] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 510\nTcp:                                 checksum = 0x1B50 (6992) [correct]\nTcp:                                   urgent = 0\nTcp: \nTcp: + NoOp: offset=20 length=1\nTcp:                                     code = 1\nTcp:                                   length = 1 [implied length from option type]\nTcp: ':
            "0000:*dc 1b a1 7e  0f db e0 9d  31 da 37 57  08 00*45 00    ...~....1.7W..E.\n0010: 00 34 90 51  40 00 80 06  e6 4c c0 a8  01 6b c0 a8    .4.Q@....L...k..\n0020: 01 6a*e5 7d  1f 90 9e 92  fd f6 51 e7  6b 00 80 10    .j.}.....Q.k...\n0030: 01 fe 1b 50  00 00 01 01  05 0a 51 e7  6a fb 51 e7    ...P......Q.j.Q.\n0040: 6b 00*                                                k.              \n",
        },
        {
          '\nFrame:\nFrame:                                  number = 6\nFrame:                               timestamp = 2021-12-24 15:09:42.903\nFrame:                             wire length = 66 bytes\nFrame:                         captured length = 66 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 52\nIp:                                       id = 0x9052 (36946)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0xE64B (58955) [correct]\nIp:                                   source = 192.168.1.107\nIp:                              destination = 192.168.1.106\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=32 \nTcp: \nTcp:                                   source = 58749\nTcp:                              destination = 8080\nTcp:                                      seq = 0x9E92FDF6 (2660433398)\nTcp:                                      ack = 0x51E76B00 (1374120704)\nTcp:                                     hlen = 8\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x10 (16)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 0... = [0] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 510\nTcp:                                 checksum = 0x1C19 (7193) [correct]\nTcp:                                   urgent = 0\nTcp: \nTcp: + NoOp: offset=20 length=1\nTcp:                                     code = 1\nTcp:                                   length = 1 [implied length from option type]\nTcp: ':
            "0000:*dc 1b a1 7e  0f db e0 9d  31 da 37 57  08 00*45 00    ...~....1.7W..E.\n0010: 00 34 90 52  40 00 80 06  e6 4b c0 a8  01 6b c0 a8    .4.R@....K...k..\n0020: 01 6a*e5 7d  1f 90 9e 92  fd f6 51 e7  6b 00 80 10    .j.}.....Q.k...\n0030: 01 fe 1c 19  00 00 01 01  05 0a 51 e7  6a 32 51 e7    ..........Q.j2Q.\n0040: 6b 00*                                                k.              \n",
        },
        {
          '\nFrame:\nFrame:                                  number = 7\nFrame:                               timestamp = 2021-12-24 15:09:43.164\nFrame:                             wire length = 129 bytes\nFrame:                         captured length = 129 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = 8c:a6:df:d1:fa:26\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x8 (8)\nIp:                    0000 10.. = [2] code point: code point 2\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 115\nIp:                                       id = 0xD4AC (54444)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 46 [time to live]\nIp:                                     type = 17 [next: User Datagram]\nIp:                                 checksum = 0x7A05 (31237) [correct]\nIp:                                   source = 106.55.209.118\nIp:                              destination = 192.168.1.106\nIp: \nUdp:  ******* Udp offset=34 (0x22) length=8 \nUdp: \nUdp:                                   source = 8000\nUdp:                              destination = 4013\nUdp:                                   length = 95\nUdp:                                 checksum = 0x2043 (8259) [correct]\nUdp: \nData:  ******* Payload offset=42 (0x2A) length=87 \nData: \n002a: 02 38 27 00  81 03 78 33  ef 45 3e 00  00 00 52 ae    .8\'...x3.E>...R.\n003a: 9b e2 97 a6  1a 64 66 00  25 b3 a3 18  a4 29 b3 af    .....df.%....)..\n004a: 19 4c 03 9f  d7 0e c7 97  1d de d7 64  80 71 ce b9    .L.........d.q..\n005a: b2 85 8b ed  27 74 46 52  79 50 8d 24  bd 97 48 4b    ....\'tFRyP.$..HK\n006a: 9b 40 2e 5f  5d a3 cd e8  d3 41 d3 fa  0a 63 5d e6    .@._]....A...c].\n007a: f2 64 36 52  52 4e 03                                 .d6RRN.         \n':
            "0000:*dc 1b a1 7e  0f db 8c a6  df d1 fa 26  08 00*45 08    ...~.......&..E.\n0010: 00 73 d4 ac  40 00 2e 11  7a 05 6a 37  d1 76 c0 a8    .s..@...z.j7.v..\n0020: 01 6a*1f 40  0f ad 00 5f  20 43*02 38  27 00 81 03    .j@..._ C.8'...\n0030: 78 33 ef 45  3e 00 00 00  52 ae 9b e2  97 a6 1a 64    x3.E>...R......d\n0040: 66 00 25 b3  a3 18 a4 29  b3 af 19 4c  03 9f d7 0e    f.%....)...L....\n0050: c7 97 1d de  d7 64 80 71  ce b9 b2 85  8b ed 27 74    .....d.q......'t\n0060: 46 52 79 50  8d 24 bd 97  48 4b 9b 40  2e 5f 5d a3    FRyP.$..HK.@._].\n0070: cd e8 d3 41  d3 fa 0a 63  5d e6 f2 64  36 52 52 4e    ...A...c]..d6RRN\n0080: 03                                                    .               \n",
        },
        {
          '\nFrame:\nFrame:                                  number = 8\nFrame:                               timestamp = 2021-12-24 15:09:43.672\nFrame:                             wire length = 55 bytes\nFrame:                         captured length = 55 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 41\nIp:                                       id = 0x9053 (36947)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0xE655 (58965) [correct]\nIp:                                   source = 192.168.1.107\nIp:                              destination = 192.168.1.106\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=20 \nTcp: \nTcp:                                   source = 58749\nTcp:                              destination = 8080\nTcp:                                      seq = 0x9E92FDF5 (2660433397)\nTcp:                                      ack = 0x51E76B00 (1374120704)\nTcp:                                     hlen = 5\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x10 (16)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 0... = [0] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 510\nTcp:                                 checksum = 0xCB31 (52017) [correct]\nTcp:                                   urgent = 0\nTcp: \nData:  ******* Payload offset=54 (0x36) length=1 \nData: \n0036: 00                                                    .               \n':
            "0000:*dc 1b a1 7e  0f db e0 9d  31 da 37 57  08 00*45 00    ...~....1.7W..E.\n0010: 00 29 90 53  40 00 80 06  e6 55 c0 a8  01 6b c0 a8    .).S@....U...k..\n0020: 01 6a*e5 7d  1f 90 9e 92  fd f5 51 e7  6b 00 50 10    .j.}.....Q.k.P.\n0030: 01 fe cb 31  00 00*00                                 ...1...         \n",
        },
        {
          '\nFrame:\nFrame:                                  number = 9\nFrame:                               timestamp = 2021-12-24 15:09:43.672\nFrame:                             wire length = 66 bytes\nFrame:                         captured length = 66 bytes\nFrame:\nEth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = dc:1b:a1:7e:0f:db\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 52\nIp:                                       id = 0x648A (25738)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0x0 (0) [incorrect: 0x1214]\nIp:                                   source = 192.168.1.106\nIp:                              destination = 192.168.1.107\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=32 \nTcp: \nTcp:                                   source = 8080\nTcp:                              destination = 58749\nTcp:                                      seq = 0x51E76B00 (1374120704)\nTcp:                                      ack = 0x9E92FDF6 (2660433398)\nTcp:                                     hlen = 8\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x10 (16)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 0... = [0] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 511\nTcp:                                 checksum = 0x844C (33868) [incorrect: 0x5C07]\nTcp:                                   urgent = 0\nTcp: \nTcp: + NoOp: offset=20 length=1\nTcp:                                     code = 1\nTcp:                                   length = 1 [implied length from option type]\nTcp: ':
            "0000:*e0 9d 31 da  37 57 dc 1b  a1 7e 0f db  08 00*45 00    ..1.7W...~....E.\n0010: 00 34 64 8a  40 00 80 06  00 00 c0 a8  01 6a c0 a8    .4d.@........j..\n0020: 01 6b*1f 90  e5 7d 51 e7  6b 00 9e 92  fd f6 80 10    .k..}Q.k.......\n0030: 01 ff 84 4c  00 00 01 01  05 0a 9e 92  fd f5 9e 92    ...L............\n0040: fd f6*                                                ..              \n",
        },
      ],
            // 当前行
            currentRow: null,
            keys: [
                `Frame:
Frame:                                  number = 176
Frame:                               timestamp = 2021-12-24 01:49:43.757
Frame:                             wire length = 54 bytes
Frame:                         captured length = 54 bytes
Frame:
Eth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN
Eth: 
Eth:                              destination = d4:c1:c8:8e:11:30
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                   source = 64:bc:58:00:b8:dd
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                     type = 0x800 (2048) [ip version 4]
Eth: 
Ip:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK
Ip: 
Ip:                                  version = 4
Ip:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]
Ip:                                 diffserv = 0x0 (0)
Ip:                    0000 00.. = [0] code point: not set
Ip:                    .... ..0. = [0] ECN bit: not set
Ip:                    .... ...0 = [0] ECE bit: not set
Ip:                                   length = 40
Ip:                                       id = 0xB286 (45702)
Ip:                                    flags = 0x2 (2)
Ip:                    0.. = [0] reserved
Ip:                    .1. = [1] DF: do not fragment: set
Ip:                    ..0 = [0] MF: more fragments: not set
Ip:                                   offset = 0
Ip:                                      ttl = 128 [time to live]
Ip:                                     type = 6 [next: Transmission Control]
Ip:                                 checksum = 0x0 (0) [incorrect: 0xFCC7]
Ip:                                   source = 10.162.13.201
Ip:                              destination = 39.107.11.172
Ip: 
Tcp:  ******* Tcp offset=34 (0x22) length=20 
Tcp: 
Tcp:                                   source = 52939
Tcp:                              destination = 443
Tcp:                                      seq = 0x3B4B91AA (994808234)
Tcp:                                      ack = 0x714B3E56 (1900756566)
Tcp:                                     hlen = 5
Tcp:                                 reserved = 0
Tcp:                                    flags = 0x10 (16)
Tcp:                    0... .... = [0] cwr: reduced (cwr)
Tcp:                    .0.. .... = [0] ece: ECN echo flag
Tcp:                    ..0. .... = [0] ack: urgent, out-of-band data
Tcp:                    ...1 .... = [1] ack: acknowledgment
Tcp:                    .... 0... = [0] ack: push current segment of data
Tcp:                    .... .0.. = [0] ack: reset connection
Tcp:                    .... ..0. = [0] ack: synchronize connection, startup
Tcp:                    .... ...0 = [0] fin: closing down connection
Tcp:                                   window = 511
Tcp:                                 checksum = 0x4B9C (19356) [incorrect: 0x1536]
Tcp:                                   urgent = 0
Tcp:`,
                `
Frame:
Frame:                                  number = 177
Frame:                               timestamp = 2021-12-24 01:49:43.937
Frame:                             wire length = 54 bytes
Frame:                         captured length = 54 bytes
Frame:
Eth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN
Eth: 
Eth:                              destination = d4:c1:c8:8e:11:30
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                   source = 64:bc:58:00:b8:dd
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                     type = 0x800 (2048) [ip version 4]
Eth: 
Ip:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK
Ip: 
Ip:                                  version = 4
Ip:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]
Ip:                                 diffserv = 0x0 (0)
Ip:                    0000 00.. = [0] code point: not set
Ip:                    .... ..0. = [0] ECN bit: not set
Ip:                    .... ...0 = [0] ECE bit: not set
Ip:                                   length = 40
Ip:                                       id = 0x5699 (22169)
Ip:                                    flags = 0x2 (2)
Ip:                    0.. = [0] reserved
Ip:                    .1. = [1] DF: do not fragment: set
Ip:                    ..0 = [0] MF: more fragments: not set
Ip:                                   offset = 0
Ip:                                      ttl = 128 [time to live]
Ip:                                     type = 6 [next: Transmission Control]
Ip:                                 checksum = 0x0 (0) [incorrect: 0x2330]
Ip:                                   source = 10.162.13.201
Ip:                              destination = 112.80.248.75
Ip: 
Tcp:  ******* Tcp offset=34 (0x22) length=20 
Tcp: 
Tcp:                                   source = 53029
Tcp:                              destination = 80
Tcp:                                      seq = 0xC35B45DB (3277538779)
Tcp:                                      ack = 0xDC0911E1 (3691581921)
Tcp:                                     hlen = 5
Tcp:                                 reserved = 0
Tcp:                                    flags = 0x11 (17)
Tcp:                    0... .... = [0] cwr: reduced (cwr)
Tcp:                    .0.. .... = [0] ece: ECN echo flag
Tcp:                    ..0. .... = [0] ack: urgent, out-of-band data
Tcp:                    ...1 .... = [1] ack: acknowledgment
Tcp:                    .... 0... = [0] ack: push current segment of data
Tcp:                    .... .0.. = [0] ack: reset connection
Tcp:                    .... ..0. = [0] ack: synchronize connection, startup
Tcp:                    .... ...1 = [1] fin: closing down connection
Tcp:                                   window = 516
Tcp:                                 checksum = 0x8121 (33057) [incorrect: 0x6631]
Tcp:                                   urgent = 0
Tcp:`,
                `
Frame:
Frame:                                  number = 178
Frame:                               timestamp = 2021-12-24 01:49:43.937
Frame:                             wire length = 54 bytes
Frame:                         captured length = 54 bytes
Frame:
Eth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN
Eth: 
Eth:                              destination = d4:c1:c8:8e:11:30
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                   source = 64:bc:58:00:b8:dd
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                     type = 0x800 (2048) [ip version 4]
Eth: 
Ip:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK
Ip: 
Ip:                                  version = 4
Ip:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]
Ip:                                 diffserv = 0x0 (0)
Ip:                    0000 00.. = [0] code point: not set
Ip:                    .... ..0. = [0] ECN bit: not set
Ip:                    .... ...0 = [0] ECE bit: not set
Ip:                                   length = 40
Ip:                                       id = 0x5699 (22169)
Ip:                                    flags = 0x2 (2)
Ip:                    0.. = [0] reserved
Ip:                    .1. = [1] DF: do not fragment: set
Ip:                    ..0 = [0] MF: more fragments: not set
Ip:                                   offset = 0
Ip:                                      ttl = 128 [time to live]
Ip:                                     type = 6 [next: Transmission Control]
Ip:                                 checksum = 0x0 (0) [incorrect: 0x2330]
Ip:                                   source = 10.162.13.201
Ip:                              destination = 112.80.248.75
Ip: 
Tcp:  ******* Tcp offset=34 (0x22) length=20 
Tcp: 
Tcp:                                   source = 53029
Tcp:                              destination = 80
Tcp:                                      seq = 0xC35B45DB (3277538779)
Tcp:                                      ack = 0xDC0911E1 (3691581921)
Tcp:                                     hlen = 5
Tcp:                                 reserved = 0
Tcp:                                    flags = 0x11 (17)
Tcp:                    0... .... = [0] cwr: reduced (cwr)
Tcp:                    .0.. .... = [0] ece: ECN echo flag
Tcp:                    ..0. .... = [0] ack: urgent, out-of-band data
Tcp:                    ...1 .... = [1] ack: acknowledgment
Tcp:                    .... 0... = [0] ack: push current segment of data
Tcp:                    .... .0.. = [0] ack: reset connection
Tcp:                    .... ..0. = [0] ack: synchronize connection, startup
Tcp:                    .... ...1 = [1] fin: closing down connection
Tcp:                                   window = 516
Tcp:                                 checksum = 0x8121 (33057) [incorrect: 0x6631]
Tcp:                                   urgent = 0
Tcp:`,
                `
Frame:
Frame:                                  number = 179
Frame:                               timestamp = 2021-12-24 01:49:43.937
Frame:                             wire length = 54 bytes
Frame:                         captured length = 54 bytes
Frame:
Eth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN
Eth: 
Eth:                              destination = d4:c1:c8:8e:11:30
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                   source = 64:bc:58:00:b8:dd
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                     type = 0x800 (2048) [ip version 4]
Eth: 
Ip:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK
Ip: 
Ip:                                  version = 4
Ip:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]
Ip:                                 diffserv = 0x0 (0)
Ip:                    0000 00.. = [0] code point: not set
Ip:                    .... ..0. = [0] ECN bit: not set
Ip:                    .... ...0 = [0] ECE bit: not set
Ip:                                   length = 40
Ip:                                       id = 0x5699 (22169)
Ip:                                    flags = 0x2 (2)
Ip:                    0.. = [0] reserved
Ip:                    .1. = [1] DF: do not fragment: set
Ip:                    ..0 = [0] MF: more fragments: not set
Ip:                                   offset = 0
Ip:                                      ttl = 128 [time to live]
Ip:                                     type = 6 [next: Transmission Control]
Ip:                                 checksum = 0x0 (0) [incorrect: 0x2330]
Ip:                                   source = 10.162.13.201
Ip:                              destination = 112.80.248.75
Ip: 
Tcp:  ******* Tcp offset=34 (0x22) length=20 
Tcp: 
Tcp:                                   source = 53029
Tcp:                              destination = 80
Tcp:                                      seq = 0xC35B45DB (3277538779)
Tcp:                                      ack = 0xDC0911E1 (3691581921)
Tcp:                                     hlen = 5
Tcp:                                 reserved = 0
Tcp:                                    flags = 0x11 (17)
Tcp:                    0... .... = [0] cwr: reduced (cwr)
Tcp:                    .0.. .... = [0] ece: ECN echo flag
Tcp:                    ..0. .... = [0] ack: urgent, out-of-band data
Tcp:                    ...1 .... = [1] ack: acknowledgment
Tcp:                    .... 0... = [0] ack: push current segment of data
Tcp:                    .... .0.. = [0] ack: reset connection
Tcp:                    .... ..0. = [0] ack: synchronize connection, startup
Tcp:                    .... ...1 = [1] fin: closing down connection
Tcp:                                   window = 516
Tcp:                                 checksum = 0x8121 (33057) [incorrect: 0x6631]
Tcp:                                   urgent = 0
Tcp:`,
                `
Frame:
Frame:                                  number = 179
Frame:                               timestamp = 2021-12-24 01:49:43.937
Frame:                             wire length = 54 bytes
Frame:                         captured length = 54 bytes
Frame:
Eth:  ******* Ethernet - "Ethernet" - offset=0 (0x0) length=14 protocol suite=LAN
Eth: 
Eth:                              destination = d4:c1:c8:8e:11:30
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                   source = 64:bc:58:00:b8:dd
Eth:                    .... ..0. .... .... = [2] LG bit
Eth:                    .... ...0 .... .... = [2] IG bit
Eth:                                     type = 0x800 (2048) [ip version 4]
Eth: 
Ip:  ******* Ip4 - "ip version 4" - offset=14 (0xE) length=20 protocol suite=NETWORK
Ip: 
Ip:                                  version = 4
Ip:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]
Ip:                                 diffserv = 0x0 (0)
Ip:                    0000 00.. = [0] code point: not set
Ip:                    .... ..0. = [0] ECN bit: not set
Ip:                    .... ...0 = [0] ECE bit: not set
Ip:                                   length = 40
Ip:                                       id = 0x5699 (22169)
Ip:                                    flags = 0x2 (2)
Ip:                    0.. = [0] reserved
Ip:                    .1. = [1] DF: do not fragment: set
Ip:                    ..0 = [0] MF: more fragments: not set
Ip:                                   offset = 0
Ip:                                      ttl = 128 [time to live]
Ip:                                     type = 6 [next: Transmission Control]
Ip:                                 checksum = 0x0 (0) [incorrect: 0x2330]
Ip:                                   source = 10.162.13.201
Ip:                              destination = 112.80.248.75
Ip: 
Tcp:  ******* Tcp offset=34 (0x22) length=20 
Tcp: 
Tcp:                                   source = 53029
Tcp:                              destination = 80
Tcp:                                      seq = 0xC35B45DB (3277538779)
Tcp:                                      ack = 0xDC0911E1 (3691581921)
Tcp:                                     hlen = 5
Tcp:                                 reserved = 0
Tcp:                                    flags = 0x11 (17)
Tcp:                    0... .... = [0] cwr: reduced (cwr)
Tcp:                    .0.. .... = [0] ece: ECN echo flag
Tcp:                    ..0. .... = [0] ack: urgent, out-of-band data
Tcp:                    ...1 .... = [1] ack: acknowledgment
Tcp:                    .... 0... = [0] ack: push current segment of data
Tcp:                    .... .0.. = [0] ack: reset connection
Tcp:                    .... ..0. = [0] ack: synchronize connection, startup
Tcp:                    .... ...1 = [1] fin: closing down connection
Tcp:                                   window = 516
Tcp:                                 checksum = 0x8121 (33057) [incorrect: 0x6631]
Tcp:                                   urgent = 0
Tcp:`,
            ],
            length: 10,
            key: `\nFrame:\nFrame:                                  number = 1\nFrame:                               timestamp = 2021-12-23 19:27:56.867\nFrame:                             wire length = 59 bytes\nFrame:                         captured length = 59 bytes\nFrame:\nEth:  ******* Ethernet - \"Ethernet\" - offset=0 (0x0) length=14 protocol suite=LAN\nEth: \nEth:                              destination = e0:9d:31:da:37:57\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                   source = 94:b8:6d:47:71:f1\nEth:                    .... ..0. .... .... = [2] LG bit\nEth:                    .... ...0 .... .... = [2] IG bit\nEth:                                     type = 0x800 (2048) [ip version 4]\nEth: \nIp:  ******* Ip4 - \"ip version 4\" - offset=14 (0xE) length=20 protocol suite=NETWORK\nIp: \nIp:                                  version = 4\nIp:                                     hlen = 5 [5 * 4 = 20 bytes, No Ip Options]\nIp:                                 diffserv = 0x0 (0)\nIp:                    0000 00.. = [0] code point: not set\nIp:                    .... ..0. = [0] ECN bit: not set\nIp:                    .... ...0 = [0] ECE bit: not set\nIp:                                   length = 45\nIp:                                       id = 0xE735 (59189)\nIp:                                    flags = 0x2 (2)\nIp:                    0.. = [0] reserved\nIp:                    .1. = [1] DF: do not fragment: set\nIp:                    ..0 = [0] MF: more fragments: not set\nIp:                                   offset = 0\nIp:                                      ttl = 128 [time to live]\nIp:                                     type = 6 [next: Transmission Control]\nIp:                                 checksum = 0x0 (0) [incorrect: 0x3BCC]\nIp:                                   source = 192.168.43.98\nIp:                              destination = 192.168.43.22\nIp: \nTcp:  ******* Tcp offset=34 (0x22) length=20 \nTcp: \nTcp:                                   source = 8080\nTcp:                              destination = 53149\nTcp:                                      seq = 0xEAFAFDF2 (3942317554)\nTcp:                                      ack = 0xA704399E (2802071966)\nTcp:                                     hlen = 5\nTcp:                                 reserved = 0\nTcp:                                    flags = 0x18 (24)\nTcp:                    0... .... = [0] cwr: reduced (cwr)\nTcp:                    .0.. .... = [0] ece: ECN echo flag\nTcp:                    ..0. .... = [0] ack: urgent, out-of-band data\nTcp:                    ...1 .... = [1] ack: acknowledgment\nTcp:                    .... 1... = [1] ack: push current segment of data\nTcp:                    .... .0.. = [0] ack: reset connection\nTcp:                    .... ..0. = [0] ack: synchronize connection, startup\nTcp:                    .... ...0 = [0] fin: closing down connection\nTcp:                                   window = 511\nTcp:                                 checksum = 0xD7E8 (55272) [incorrect: 0xD926]\nTcp:                                   urgent = 0\nTcp: \nData:  ******* Payload offset=54 (0x36) length=5 \nData: \n0036: 30 0d 0a 0d  0a                                       0....           \n`,
            value: `\n0000:*e0 9d 31 da  37 57 94 b8  6d 47 71 f1  08 00*45 00    ..1.7W..mGq...E.\n0010: 00 2d e7 35  40 00 80 06  00 00 c0 a8  2b 62 c0 a8    .-.5@.......+b..\n0020: 2b 16*1f 90  cf 9d ea fa  fd f2 a7 04  39 9e 50 18    +..........9.P.\n0030: 01 ff d7 e8  00 00*30 0d  0a 0d 0a*                   ......0....     \n`,
        };
    },
    created() {
        this.dataRaw.forEach((item, index) => {
            item.index = index;
        });
        this.id = this.$route.query.id;
        this.datas = this.dataRaw.slice(0,3);
        this.$axios
            .post(`/web/showInformation`)
            .then((res) => {
                console.log(res);
                this.datas = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.timer = setInterval(() => {
            this.$axios
                .post(`/web/showInformation`)
                .then((res) => {
                    console.log(res);
                    this.datas = this.datas.concat(res.data.data);
                })
                .catch((error)=> {
                   this.datas = this.dataRaw
                });
        }, 3000);

        setTimeout(()=>{
          clearInterval(this.timer)
        },20000)

        console.log('this.details',this.details);
    },
    methods: {
        handleCurrentChange(val) {
            clearInterval(this.timer);
            this.currentRow = val;
            this.$axios
                .post(`/web/showDetail?pkgNum=${val.no}`)
                .then((res) => {
                    console.log(res);
                    let key = Object.keys(res.data.data)[0];
                    console.log("key", key);
                    let value = Object.values(res.data.data)[0];
                    if (key) this.key = key;
                    if (value) this.value = value;
                })
                .catch((error) =>{
                    console.log(error);
                    console.log(this.details[val.no]);
                    let key = Object.keys(this.details[val.no])[0];
                    console.log("key", key);
                    let value = Object.values(this.details[val.no])[0];
                    if (key) this.key = key;
                    if (value) this.value = value;
                });
            console.log("val", val);
            if (val.no == 176) {
                this.key = this.keys[0];
            }
            if (val.no == 177) {
                this.key = this.keys[1];
            }
            if (val.no == 177) {
                this.key = this.keys[2];
            }
            if (val.no == 178) {
                this.key = this.keys[3];
            }
            if (val.no == 179) {
                this.key = this.keys[4];
            }
        },
        choose(id) {
            console.log("id", id);
            //开启监听
            this.$axios
                .post(`/web/selectAdaptor?adaptorNum=${id}`)
                .then(function (response) {
                    console.log(response);
                })
                //没网
                .catch(function (error) {
                    console.log(error);

                });
            //跳转到监听页面
            this.$router.push(`/listen?id=${id}`);
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
    text-align: center;
    font-size: 30px;
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
