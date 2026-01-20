import { RouterOSAPI } from 'node-routeros'

import { appConfig } from '../config/appConfig'
import { routerConfig } from '../config/router.config'

const API = new RouterOSAPI({
  host: routerConfig.host,
  user: routerConfig.user,
  password: routerConfig.password,
})

try {
  await API.connect()

  // Adicionar usuário Hotspot
  await API.write('/ip/hotspot/user/add', [
    `=server=${appConfig.mikhmon}`,
    `=name=${name}`,
    `=password=${password}`,
    `=profile=${profile}`,
    `=mac-address=${macaddr}`,
    `=disabled=no`,
    `=limit-uptime=${timelimit}`,
    `=limit-bytes-total=${datalimit}`,
    `=comment=${userComment}`,
  ])

  // Buscar usuário adicionado
  const result = await API.write('/ip/hotspot/user/print', [`?name=${name}`])
  const response = await API.read() // lê o resultado do comando

  console.log(response) // aqui você terá os dados do usuário
} finally {
  API.close()
}
