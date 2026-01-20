import Routeros from './Routeros'

async function run() {
  const routeros = new Routeros({
    host: '127.0.0.1',
    port: 8728,
    user: 'admin',
    password: '',
  })

  try {
    // connect to RouterOS
    const conn = await routeros.connect()

    // if connected successfully will return the connected instance/socket,
    console.log('conn===>', conn)

    // after that we can write the query
    const usersHotspot = conn.write(['/ip/hotspot/user/print'])
    console.log(usersHotspot)
  } catch (error) {
    // if it fails will return an error here
    console.log('error===>', error)
  } finally {
    // dont forget to close connection
    routeros.destroy()
  }
}

run()
