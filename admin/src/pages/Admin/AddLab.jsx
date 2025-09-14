// admin/src/pages/Admin/AddLab.jsx
import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const AddLab = () => {
  const { aToken, getAllLabs } = useContext(AdminContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [labImg, setLabImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [services, setServices] = useState("");
  const [fees, setFees] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setLabImg(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      const fileInput = e.target.image?.files[0];
      if (fileInput) fd.append("image", fileInput);
      fd.append("name", name);
      fd.append("email", email);
      fd.append("address", address);
      fd.append("city", city);
      fd.append("phone", phone);
      fd.append("about", about);
      fd.append("services", services);
      fd.append("fees", fees);

      const { data } = await axios.post(`${backendUrl}/api/admin/add-lab`, fd, {
        headers: { aToken, "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message || "Lab added");
        setName("");
        setEmail("");
        setAddress("");
        setCity("");
        setPhone("");
        setAbout("");
        setServices("");
        setFees("");
        setLabImg(false);
        if (getAllLabs) getAllLabs();
      } else {
        toast.error(data.message || "Failed to add lab");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={submit} className="p-6">
      <h2 className="text-lg font-medium mb-4">Add Lab</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="input" />
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        </div>

        <div>
          <label className="block mb-2">Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />
        </div>

        <div>
          <label className="block mb-2">City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} className="input" />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2">Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="input" />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2">About</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={4} className="input" />
        </div>

        <div>
          <label className="block mb-2">Services (comma separated)</label>
          <input value={services} onChange={(e) => setServices(e.target.value)} className="input" />
        </div>

        <div>
          <label className="block mb-2">Fees (representative)</label>
          <input value={fees} onChange={(e) => setFees(e.target.value)} className="input" />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2">Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleImage} />
          {labImg && <img src={labImg} alt="preview" className="w-40 mt-2 rounded" />}
        </div>
      </div>

      <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full mt-4">Add Lab</button>
    </form>
  );
};

export default AddLab;
