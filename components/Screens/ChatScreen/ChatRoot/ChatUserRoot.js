import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Chatheadder from '../ChtaUsers/ChatHeader/ChatHeaderRoot';
import Chatprofiles from '../ChtaUsers/ChatProfiles/Profile';
import privateAPI from '../../../api/privateAPI';

export default function ChatuserRoot() {

  useEffect(() => {

      const fetchUsers = async () => {
        try {
          const res = await privateAPI.post('/chat/getAllUser', {});
          setItems(res.data)
        } catch (error) {
          console.error(error)
        }

      }
      fetchUsers()
  }, [])
  const [items, setItems] = useState([]);

  // const [items, setItems] = useState([
  //   { userId: 0, userName: 'Ram', },
  //   { userId: 1, userName: 'Jero', },
  // ]);

  const [search, setSearch] = useState("");


  return (
    <>
      <View>

        <Chatheadder
          search={search}
          setSearch={setSearch}
          items={items}
        />

        <Chatprofiles
          items={items}
          setItems={setItems}
          search={search}
        />

      </View>
    </>
  )
}
// {items.filter((item) => ((item.username).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))