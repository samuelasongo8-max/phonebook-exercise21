import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl)

const create = (newPerson) => axios.post(baseUrl, newPerson)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, remove }