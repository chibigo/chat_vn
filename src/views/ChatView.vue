<template>
  <div class="bg-grey-4 Layout_chat" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="toggleLeftDrawer"
          />

          <q-btn round flat>
            <q-avatar v-if="userItem?.image == '' || userItem?.image == null">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-avatar v-else>
              <img :src="userItem?.image" />
            </q-avatar>
          </q-btn>

          <span class="q-subtitle-1 q-pl-md">
            {{ userItem?.name }}
          </span>

          <q-space />

          <q-btn round flat icon="search" />
          <q-btn round flat @click="dialogUploadImage = true">
            <q-icon name="attachment" class="rotate-135" />
          </q-btn>
          <DialogUploadImg
            :dialogUploadImage="dialogUploadImage"
            @handleCloseDialog="handleCloseDialog"
          />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>Clear messages</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="690">
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <q-btn round flat icon="chat" />
          </q-avatar>
          <q-space />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>New group</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round flat icon="close" class="WAL__drawer-close" @click="toggleLeftDrawer" />
        </q-toolbar>

        <q-toolbar class="bg-grey-2">
          <q-input
            rounded
            outlined
            dense
            class="WAL__field full-width"
            bg-color="white"
            v-model="search"
            placeholder="Search or start a new conversation"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="(conversation, index) in conversations"
              :key="conversation.id"
              clickable
              @click="setCurrentConversation(index)"
            >
              <q-item-section avatar>
                <q-avatar v-if="conversation?.image == '' || conversation?.image == null">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                <q-avatar v-else>
                  <img :src="conversation?.image" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ conversation.name }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <q-icon name="check" v-if="conversation.sent ?? true" />
                  <q-icon name="not_interested" v-if="conversation.deleted" />
                  {{ conversation.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-badge rounded color="red" :label="conversation.count" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <div style="width: 100%" class="q-px-md q-pt-md">
          <q-page>
            <q-chat-message
              v-for="(messageItem, index) in listMessage"
              :key="index"
              :name="handleGetNameUser(messageItem)"
              avatar="https://cdn.quasar.dev/img/avatar4.jpg"
              :sent="messageItem.dataConvert?.id === userStore?.id"
              :stamp="timeStampMessage(messageItem.dataConvert.time)"
            >
              <div v-html="formatMessage(messageItem.dataConvert?.content)"></div>
            </q-chat-message>
            <q-page-scroller reverse position="top" :scroll-offset="20" :offset="[0, 52]">
              <q-btn fab icon="keyboard_arrow_down" color="accent" />
            </q-page-scroller>
          </q-page>
        </div>
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-item class="form_emojis">
            <q-btn round flat icon="insert_emoticon" class="q-mr-sm" @click="showModelEmoji()" />
            <buttonEmojis
              class="form_emojis_item"
              v-if="isShowEmoji"
              @emoji_click="handle_emoji_click"
            />
          </q-item>
          <q-form @submit="submitMessage" class="full-width row">
            <q-input
              rounded
              outlined
              dense
              class="WAL__field col-grow q-mr-sm"
              bg-color="white"
              v-model="message"
              placeholder="Type a message"
            />
            <q-btn type="submit" round dense flat icon="send" />
          </q-form>
          <q-btn round flat icon="mic" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, computed, watchEffect, onMounted, watch } from 'vue'
import { db, dbRealTime } from '@/firebase'
import { ref as storageRef, set, push, onValue, update } from 'firebase/database'
import { collection, getDocs } from 'firebase/firestore'
import { userLoginStore } from '@/stores/user.js'
import DOMPurify from 'dompurify'
import buttonEmojis from '@/components/buttons/button_emojis.vue'
import DialogUploadImg from '@/components/dialogs/upload_image.vue'

const conversations = []
const $q = useQuasar()

const leftDrawerOpen = ref(false)
const search = ref('')
const message = ref('')
const userStore = userLoginStore()
const userItem = ref({})
const dataMessage = ref({
  id: null,
  toId: null,
  content: '',
  time: '',
  image: '',
  sent: false
})
const listMessage = ref([])
const listMessageSent = ref([])
const currentConversationIndex = ref(0)
const isShowEmoji = ref(false)
const dialogUploadImage = ref(false)

const getUserList = async () => {
  const userId = userStore.id
  const querySnapshot = await getDocs(collection(db, 'users'))
  conversations.push(
    ...querySnapshot.docs.filter((doc) => userId !== doc.data().id).map((doc) => doc.data())
  )
  await getUserItem()
}

const getUserItem = async () => {
  userItem.value = conversations[currentConversationIndex.value]
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function setCurrentConversation(index) {
  currentConversationIndex.value = index
  sentCurrentMessage(currentConversationIndex)
}

const style = computed(() => ({
  height: $q.screen.height + 'px'
}))

//Handle add message in firebase
const submitMessage = async () => {
  const timestamp = new Date().getTime()
  if (message.value == '') {
    return
  } else {
    dataMessage.value = {
      id: userStore.id,
      content: message.value,
      toId: userItem.value?.id,
      image: '',
      time: timestamp,
      sent: false
    }
    // set(storageRef(dbRealTime, 'message'), { ...dataMessage })
    const addRef = storageRef(dbRealTime, 'message')
    const newPostRef = push(addRef)
    await set(newPostRef, {
      ...dataMessage.value
    })
    message.value = ''
  }
}

// Handle get message from firebase
const getListMessage = async () => {
  const starCountRef = storageRef(dbRealTime, 'message')
  onValue(starCountRef, (snapshot) => {
    const user = userItem.value
    const datas = snapshot.val()
    const propertyDatas = datas ? Object.keys(datas) : []
    listMessageSent.value = []
    listMessage.value = []
    propertyDatas.forEach((element) => {
      const dataConvert = datas[element]
      if (dataConvert.sent == false) {
        listMessageSent.value.push(dataConvert)
      }
      const currentUser = userStore.id === dataConvert.id || userStore.id === dataConvert.toId
      const peerUser = user?.id && (user?.id == dataConvert.id || user?.id == dataConvert.toId)

      if (currentUser && peerUser) {
        listMessage.value.push({ dataConvert, key: element })
      }
    })
  })
}

// Handle get name user
const handleGetNameUser = (messageItem) => {
  const user = userItem.value
  if (messageItem.id === userStore.id) {
    return 'me'
  }
  return user?.name
}

// Handle get time when send messsage
const timeStampMessage = (timeMessage) => {
  if (timeMessage == null || timeMessage == NaN) {
    return ''
  }
  const currentTime = new Date()
  const messageTime = new Date(timeMessage)
  const timeDiffMs = currentTime.getTime() - messageTime.getTime()

  const currentMinuteSend = Math.floor(timeDiffMs / (1000 * 60))
  const currentHoursSend = Math.floor(currentMinuteSend / 60)
  const currentDaysSend = Math.floor(currentHoursSend / 24)

  if (currentDaysSend >= 1) {
    return `${currentDaysSend} days ago`
  } else if (currentHoursSend >= 1) {
    return `${currentHoursSend} hours ago`
  } else if (currentMinuteSend >= 1) {
    return `${currentMinuteSend} minutes ago`
  } else {
    return ''
  }
}

const handleSentMessage = () => {
  const countMap = {}

  listMessageSent.value.forEach((elementA) => {
    const id = elementA.id
    const currentId = id === userStore.id
    const toCurrentId = elementA.toId === userStore.id
    if (countMap[id] && !currentId && toCurrentId) {
      countMap[id].count++
    } else if (!currentId && toCurrentId) {
      countMap[id] = {
        id,
        count: 1
      }
    }
  })

  const result = Object.values(countMap)
  for (const item of result) {
    const conversationIndex = conversations.findIndex((conv) => conv.id === item.id)
    if (conversationIndex !== -1) {
      conversations[conversationIndex].count = item.count
      conversations[conversationIndex].sent = false
    }
  }
  console.log(conversations)
}

const sentCurrentMessage = (currentChatIndex) => {
  const currentUserSent = conversations[currentChatIndex.value]
  const updates = {}
  const foundMessages = listMessage.value.filter(
    (element) => element.dataConvert.sent === false && currentUserSent.id === element.dataConvert.id
  )
  if (foundMessages.length > 0) {
    dataMessage.value = {
      sent: true
    }
    foundMessages.forEach(async (message) => {
      Object.assign(message.dataConvert, dataMessage.value)
      updates['/message/' + message.key] = message.dataConvert
      await update(storageRef(dbRealTime), updates)
    })
  }
}
//Format message url
const formatMessage = (str) => {
  const sanitizedStr = DOMPurify.sanitize(str)
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/
  const extensionPattern = /\.(com|edu|gov|vn|net|org|info|pro|coop|museum|[a-zA-Z]{2})$/i

  let messageArray = sanitizedStr.split(' ')
  let modifiedArray = []

  messageArray.forEach((value) => {
    if (urlPattern.test(value) || extensionPattern.test(value)) {
      modifiedArray.push(`<a href="${value}">${value}</a>`)
    } else {
      modifiedArray.push(value)
    }
  })
  return modifiedArray.join(' ')
}
// handle show emoji
const showModelEmoji = () => {
  if (isShowEmoji.value == true) {
    isShowEmoji.value = false
  } else {
    isShowEmoji.value = true
  }
}
// handle get emoji
const handle_emoji_click = (emoji) => {
  message.value += emoji
}

// handle close dialog
const handleCloseDialog = (val) => {
  dialogUploadImage.value = val
}

getUserList()
toggleLeftDrawer
watchEffect(getUserItem)
watch(userItem, () => {
  getListMessage()
})
// watch(currentConversationIndex, () => {
//   sentCurrentMessage()
// })
watch(listMessageSent, () => {
  handleSentMessage()
})
</script>

<style lang="scss">
.Layout_chat {
  display: flex;
  align-items: center;
}
.WAL {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  &:before {
    content: '';
    height: 127px;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #009688;
  }

  &__layout {
    margin: 0 auto;
    z-index: 4000;
    height: 50%;
    width: 90%;
    max-width: 1200px;
    border-radius: 5px;
  }

  &__field.q-field--outlined .q-field__control:before {
    border: none;
  }

  .q-drawer--standard .WAL__drawer-close {
    display: none;
  }
}

.conversation__summary {
  margin-top: 4px;
}
.form_emojis {
  .form_emojis_item {
    position: fixed;
    top: 20%;
    left: 16%;
  }
}
</style>
