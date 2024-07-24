import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { vehiclesApi } from "../../../sevices/rtk-api/vehicleApi";
import { CarCardProps } from "../../../types/types";
import { cloudinaryConfig } from "../../../cloudinary/CloudinaryConfig";
import CarCard from "./carcard/CarCard";
import { ClipLoader } from "react-spinners";

interface FormDataState {
  rental_rate: number;
  availability: boolean;
  vehicle_image: File | null;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
  vehicle_id?: number;
}

const ManageVehicles: React.FC = () => {
  const { data: vehicles = [], refetch } = vehiclesApi.useGetVehiclesQuery();
  const [addVehicle] = vehiclesApi.useAddVehicleMutation();
  const [deleteVehicle] = vehiclesApi.useDeleteVehicleMutation();
  const [updateVehicle] = vehiclesApi.useUpdateVehicleMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataState>({
    rental_rate: 0,
    availability: true,
    vehicle_image: null,
    manufacturer: "",
    model: "",
    year: 0,
    fuel_type: "",
    engine_capacity: "",
    transmission: "",
    seating_capacity: 0,
    color: "",
    features: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === "file" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? parseFloat(value) : value,
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";
      if (formData.vehicle_image) {
        const formDataImage = new FormData();
        formDataImage.append("file", formData.vehicle_image);
        formDataImage.append("upload_preset", cloudinaryConfig.uploadPreset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudname}/image/upload`,
          formDataImage
        );

        if (response.status === 200) {
          imageUrl = response.data.secure_url;
        } else {
          console.error("Failed to upload image:", response.statusText);
          toast.error("Failed to upload image");
          return;
        }
      }

      const vehicleData = {
        vehicle: {
          rental_rate: formData.rental_rate,
          availability: formData.availability,
          vehicle_image: imageUrl,
        },
        vehicleSpec: {
          manufacturer: formData.manufacturer,
          model: formData.model,
          year: formData.year,
          fuel_type: formData.fuel_type,
          engine_capacity: formData.engine_capacity,
          transmission: formData.transmission,
          seating_capacity: formData.seating_capacity,
          color: formData.color,
          features: formData.features,
        },
      };

      await addVehicle(vehicleData).unwrap();
      refetch();
      toast.success("Vehicle added successfully");
      clearForm();
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error(error.message);
    } finally{
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      rental_rate: 0,
      availability: true,
      vehicle_image: null,
      manufacturer: "",
      model: "",
      year: 0,
      fuel_type: "",
      engine_capacity: "",
      transmission: "",
      seating_capacity: 0,
      color: "",
      features: "",
    });
  };

  const handleDeleteVehicle = async (id: number) => {
    try {
      await deleteVehicle(id).unwrap();
      refetch();
      toast.success("Vehicle deleted successfully");
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      toast.error("Failed to delete vehicle");
    }
  };

  const handleUpdateVehicle = async (id: number) => {
    const vehicleToUpdate = vehicles.find(
      (vehicle) => vehicle.vehicle_id === id
    );

    if (vehicleToUpdate) {
      try {
        let imageUrl = vehicleToUpdate.vehicle_image;

        if (formData.vehicle_image) {
          const formDataImage = new FormData();
          formDataImage.append("file", formData.vehicle_image);
          formDataImage.append("upload_preset", cloudinaryConfig.uploadPreset);

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudname}/image/upload`,
            formDataImage
          );

          if (response.status === 200) {
            imageUrl = response.data.secure_url;
          } else {
            console.error("Failed to upload image:", response.statusText);
            toast.error("Failed to upload image");
            return;
          }
        }

        const updatedVehicleData = {
          vehicleSpec: {
            manufacturer:
              formData.manufacturer || vehicleToUpdate.vehicleSpec.manufacturer,
            model: formData.model || vehicleToUpdate.vehicleSpec.model,
            year: formData.year || vehicleToUpdate.vehicleSpec.year,
            fuel_type:
              formData.fuel_type || vehicleToUpdate.vehicleSpec.fuel_type,
            engine_capacity:
              formData.engine_capacity ||
              vehicleToUpdate.vehicleSpec.engine_capacity,
            transmission:
              formData.transmission || vehicleToUpdate.vehicleSpec.transmission,
            seating_capacity:
              formData.seating_capacity ||
              vehicleToUpdate.vehicleSpec.seating_capacity,
            color: formData.color || vehicleToUpdate.vehicleSpec.color,
            features: formData.features || vehicleToUpdate.vehicleSpec.features,
          },
          vehicle: {
            rental_rate: formData.rental_rate || vehicleToUpdate.rental_rate,
            availability: formData.availability,
            vehicle_image: imageUrl,
          },
          vehicle_id: vehicleToUpdate.vehicle_id,
          vehicle_image: imageUrl,
          rental_rate: formData.rental_rate || vehicleToUpdate.rental_rate,
          availability: formData.availability,
        };

        await updateVehicle({
          id,
          updatedVehicle: updatedVehicleData,
        }).unwrap();
        refetch();
        toast.success("Vehicle updated successfully");
        setIsModalOpen(false);
      } catch (error: any) {
        console.error("Error:", error.message);
        toast.error("Failed to update vehicle");
      }
    }
  };

  const handleOpenModal = (car: CarCardProps) => {
    setFormData({
      rental_rate: car.rental_rate,
      availability: car.availability,
      vehicle_image: null,
      manufacturer: car.vehicleSpec.manufacturer,
      model: car.vehicleSpec.model,
      year: car.vehicleSpec.year,
      fuel_type: car.vehicleSpec.fuel_type,
      engine_capacity: car.vehicleSpec.engine_capacity,
      transmission: car.vehicleSpec.transmission,
      seating_capacity: car.vehicleSpec.seating_capacity,
      color: car.vehicleSpec.color,
      features: car.vehicleSpec.features,
      vehicle_id: car.vehicle_id,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearForm();
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Manage Vehicles
      </Typography>
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6">Add New Vehicle</Typography>
          <form
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Manufacturer"
              variant="outlined"
              fullWidth
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              type="number"
              name="year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
            />
            <TextField
              label="Fuel Type"
              variant="outlined"
              fullWidth
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
            />
            <TextField
              label="Engine Capacity"
              variant="outlined"
              fullWidth
              name="engine_capacity"
              value={formData.engine_capacity}
              onChange={handleChange}
            />
            <TextField
              label="Transmission"
              variant="outlined"
              fullWidth
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            />
            <TextField
              label="Seating Capacity"
              variant="outlined"
              fullWidth
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seating_capacity: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
            <TextField
              label="Features"
              variant="outlined"
              fullWidth
              name="features"
              value={formData.features}
              onChange={handleChange}
            />
            <TextField
              label="Rental Rate"
              variant="outlined"
              fullWidth
              type="number"
              name="rental_rate"
              value={formData.rental_rate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rental_rate: parseFloat(e.target.value),
                })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.availability}
                  onChange={handleChange}
                  name="availability"
                />
              }
              label="Available"
            />
            <div className="sm:col-span-2">
              <input
                type="file"
                accept="image/*"
                name="vehicle_image"
                onChange={handleChange}
                style={{ marginTop: "16px", marginBottom: "8px" }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <ClipLoader size={24} color="#ffffff" />
              ) : (
                "Add Vehicle"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((car: CarCardProps) => (
          <CarCard
            key={car.vehicle_id}
            vehicle_id={car.vehicle_id}
            vehicle_image={car.vehicle_image}
            rental_rate={car.rental_rate}
            availability={car.availability}
            vehicleSpec={car.vehicleSpec}
            onDelete={() => handleDeleteVehicle(car.vehicle_id)}
            onUpdate={() => handleOpenModal(car)}
          />
        ))}
      </div>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Update Vehicle</DialogTitle>
        <DialogContent>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Manufacturer"
              variant="outlined"
              fullWidth
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              type="number"
              name="year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
            />
            <TextField
              label="Fuel Type"
              variant="outlined"
              fullWidth
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
            />
            <TextField
              label="Engine Capacity"
              variant="outlined"
              fullWidth
              name="engine_capacity"
              value={formData.engine_capacity}
              onChange={handleChange}
            />
            <TextField
              label="Transmission"
              variant="outlined"
              fullWidth
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            />
            <TextField
              label="Seating Capacity"
              variant="outlined"
              fullWidth
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seating_capacity: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
            <TextField
              label="Features"
              variant="outlined"
              fullWidth
              name="features"
              value={formData.features}
              onChange={handleChange}
            />
            <TextField
              label="Rental Rate"
              variant="outlined"
              fullWidth
              type="number"
              name="rental_rate"
              value={formData.rental_rate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rental_rate: parseFloat(e.target.value),
                })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.availability}
                  onChange={handleChange}
                  name="availability"
                />
              }
              label="Available"
            />
            <Button variant="contained" component="label">
              Upload Vehicle Image
              <input
                type="file"
                hidden
                name="vehicle_image"
                onChange={handleChange}
              />
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdateVehicle(formData.vehicle_id!)}
            color="primary"
          >
            Update Vehicle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageVehicles;
