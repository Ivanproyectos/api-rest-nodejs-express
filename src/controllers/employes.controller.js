import { connectDB } from '../config/db.js'
import sql from 'mssql'

// const sqlRequest = new sql.Request()

export const getEmployes = async (req, res) => {
  try {
    const pool = await connectDB()
    const result = await pool.request().query('SELECT * FROM clientes')
    res.json(result.recordset)
  } catch (error) {
    console.error(error)
    res.status(500).send('algo salio mal al actualizar')
  } finally {
    sql.close()
  }
}
export const getByIdEmploye = async (req, res) => {
  try {
    const id = req.params.id
    const pool = await connectDB()
    const { recordset } = await pool.request()
      .input('id', sql.BigInt, id)
      .query('SELECT * FROM clientes WHERE Id = @id')
    if (recordset.length === 0) {
      return res.status(404).send('No se encontro el cliente')
    }
    res.status(201).json(recordset[0])
  } catch (error) {
    console.error(error)
    res.status(500).send('algo salio mal al actualizar')
  } finally {
    sql.close()
  }
}

export const postEmployes = async (req, res) => {
  try {
    const { nombre, apePaterno, apeMaterno } = req.body
    const pool = await connectDB()
    const { rowsAffected } = await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('apePaterno', sql.VarChar, apePaterno)
      .input('apeMaterno', sql.VarChar, apeMaterno)
      .query('INSERT INTO clientes (Nombre, ApellidoPaterno, ApellidoMaterno) VALUES (@nombre, @apePaterno, @apeMaterno)')
    res.status(201).json(rowsAffected)
  } catch (error) {
    console.error(error)
    res.status(500).send('algo salio mal al actualizar')
  } finally {
    sql.close()
  }
}

export const updateEmployes = async (req, res) => {
  try {
    const { idCliente, nombre, apePaterno, apeMaterno } = req.body
    const pool = await connectDB()
    const { rowsAffected } = await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('apePaterno', sql.VarChar, apePaterno)
      .input('apeMaterno', sql.VarChar, apeMaterno)
      .input('id', sql.BigInt, idCliente)
      .query('UPDATE clientes SET Nombre = @nombre, ApellidoPaterno = @apePaterno, ApellidoMaterno = @apeMaterno WHERE Id = @id')
    res.status(200).json(rowsAffected)
  } catch (error) {
    console.error(error)
    res.status(500).send('algo salio mal al actualizar')
  } finally {
    sql.close()
  }
}

export const deleteEmployes = async (req, res) => {
  try {
    const id = req.params.id
    const pool = await connectDB()
    const { rowsAffected } = await pool.request()
      .input('id', sql.BigInt, id)
      .query('DELETE FROM clientes  WHERE Id = @id')
    if (rowsAffected[0] === 0) {
      return res.status(404).send('No se encontro el cliente')
    }
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).send('algo salio mal al actualizar')
  } finally {
    sql.close()
  }
}
