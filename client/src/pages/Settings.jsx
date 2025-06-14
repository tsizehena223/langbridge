import { useRef, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../components";
import Avatar from "../assets/avatar.svg";
import Info from "../assets/info-pers.svg";
import { editFields } from "../static/form-fields";
import FormInput from "../components/form/FormInput";
import FormSelect from "../components/form/FormSelect";
import { useAuth } from "../contexts/AuthContext";
import { editRules, validateForm } from "../utils/form";
import userService from "../services/user";
import { toast } from "react-toastify";

const Setting = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const { userData, updateUserData } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: userData.name,
    language: userData.language,
    password: "",
    passwordConfirm: "",
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(formData, editRules);
    setErrors(errors);

    if (!Object.keys(errors).length) {
      const data = new FormData();

      data.append("username", formData.username);
      data.append("language", formData.language);
      data.append("password", formData.password);

      if (image instanceof File) {
        data.append("image", image);
      }

      try {
        const newData = await userService.updateUser(data, userData.token);
        updateUserData(newData.data);
        toast.success("Informations updated");
        navigate("/");
      } catch (error) {
        toast.error("An error occured");
      }
    }
  };

  return (
    <MainLayout>
      <div
        className="w-full p-8 flex flex-col items-center 
        rounded-md bg-light dark:bg-gray-2"
      >
        <div className="relative p-4">
          <div className="w-44 h-44 rounded-full overflow-clip">
            <img
              src={
                image ? URL.createObjectURL(image) : userData.image || Avatar
              }
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="absolute bottom-2 right-6"
            onClick={handleImageClick}
          >
            <RiEditLine size={24} />
          </button>
        </div>
        <input
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        <div className="flex items-center justify-evenly p-4">
          <div className="hidden md:block w-1/2">
            <img className="" src={Info} alt="" />
          </div>

          <div className="z-10 space-x-4">
            <form
              className="w-fit flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              {editFields.map((field, key) => (
                <div key={key} className="mb-3 space-y-2">
                  {field.select ? (
                    <FormSelect
                      key={key}
                      icon={field.icon}
                      name={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      options={field.options}
                      value={formData[field.name]}
                      onChange={handleChange}
                      error={errors[field.name]}
                    />
                  ) : (
                    <FormInput
                      key={key}
                      icon={field.icon}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      error={errors[field.name]}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="mt-3 py-2 px-6 rounded-md flex-wrap
                  text-light bg-purple hover:bg-green"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Setting;
