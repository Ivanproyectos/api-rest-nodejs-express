import pool from '../config/db.js'

export const getEmployes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('ocurrio un error interno intenlo mas tarde')
  }
}
export const getByIdEmploye = async (req, res) => {
  try {
    const id = req.params.id
    const [rows] = await pool
      .query('SELECT * FROM employee WHERE Id = ?', [id])
    if (rows.length === 0) {
      return res.status(404).send('No se encontro el cliente')
    }
    res.status(201).json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send('ocurrio un error interno intenlo mas tarde')
  }
}

export const postEmployes = async (req, res) => {
  try {
    const { nombre, apePaterno, apeMaterno, edad } = req.body
    const [result] = await pool
      .query('INSERT INTO employee (nombre, apePaterno, apeMaterno,edad) VALUES (?, ?, ?, ?)',
        [nombre, apePaterno, apeMaterno, edad])
    res.status(201).json(result.affectedRows)
  } catch (error) {
    console.error(error)
    res.status(500).send('ocurrio un error interno intenlo mas tarde')
  }
}

export const updateEmployes = async (req, res) => {
  try {
    const id = req.params.id
    const { nombre, apePaterno, apeMaterno, edad } = req.body
    const [result] = await pool
      .query('UPDATE employee SET nombre = ?, apePaterno = ?, apeMaterno = ? , edad = ? WHERE Id = ?',
        [nombre, apePaterno, apeMaterno, edad, id])
    if (result.affectedRows === 0) {
      return res.status(404).send('No se encontro el empleado')
    }
    console.log(result)
    res.status(200).send()
  } catch (error) {
    console.error(error)
    res.status(500).send('ocurrio un error interno intenlo mas tarde')
  }
}

export const deleteEmployes = async (req, res) => {
  try {
    const id = req.params.id
    const [result] = await pool
      .query('DELETE FROM employee  WHERE Id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).send('No se encontro el cliente')
    }
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).send('ocurrio un error interno intenlo mas tarde')
  }
}
