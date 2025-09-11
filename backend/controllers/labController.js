// controllers/labController.js
import LabModel from '../models/labModel.js'

export const addLab = async (req, res) => {
  try {
    const { name, email, password, experience, fees, about, speciality, degree, address } = req.body

    const newLab = new LabModel({
      name,
      email,
      password,
      experience,
      fees,
      about,
      speciality,
      degree,
      address: JSON.parse(address),
      image: req.file?.path
    })

    await newLab.save()

    res.status(200).json({ success: true, message: 'Lab added successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Error while adding lab' })
  }
}

export const allLabs = async (req, res) => {
  try {
    const labs = await LabModel.find()
    res.status(200).json({ success: true, labs })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Error while fetching labs' })
  }
}
