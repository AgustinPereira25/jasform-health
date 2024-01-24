import { useForm } from "react-hook-form";

import { FileUploader } from "@/components";
import { useUserStore } from "@/stores";
import { Button, icons, Input } from "@/ui";

// import { UserRoles } from '@/api'

interface ProfileForm {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  title?: string;
  organization?: string;
  subscription?: string;
  // roles?: UserRoles[],
  status?: string;
}

export const Profile = () => {
  const { user } = useUserStore();

  // const defaultRole = user!.roles?.length === 0 ? 'Admin': user!.roles![0]!.name;

  const {
    register,
    handleSubmit,
    // formState: { errors },
    // setValue,
  } = useForm({
    defaultValues: {
      id: user?.id,
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      title: user?.position_in_organization,
      organization: user?.organization_name,
      // role: defaultRole,
    },
  });

  const onSubmit = (data: ProfileForm) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white">
        <h2 className="flex items-center justify-between px-2 pb-4 text-2xl font-semibold leading-7 text-black">
          My Profile
          <div className="flex gap-5">
            <Button variant="secondary" onClick={() => console.log("pepe")}>
              Review Terms & Conditions
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </h2>
      </div>
      <div className="w-3/5 rounded-xl border-[1px] bg-white px-6 pb-2 pt-4 shadow-lg">
        <div className="flex h-36 gap-8 p-3">
          <div className="flex w-40 shrink-0">
            <span>Profile Picture</span>
          </div>
          <div className="flex shrink-0 overflow-hidden rounded-full">
            <div className="relative p-0 ">
              <img
                src={user?.photo}
                alt="user"
                className="h-[120px] w-[120px]"
              />
              <Button
                variant="primary"
                onClick={() => console.log("pepe")}
                className="absolute bottom-0 left-0 right-0 w-full p-0 text-xs"
              >
                Edit
              </Button>
            </div>
          </div>
          {/* ToDo: Agregar props como url del endpoint,etc para hacerlo mas generico */}
          <FileUploader />
        </div>
        <hr className="mx-3" />
        <div className="flex h-16 p-3">
          <div className="flex w-40">
            <span>First Name</span>
          </div>
          <div className="flex grow">
            <Input
              containerClassName="w-full"
              fullHeight
              type="text"
              id="firstName"
              placeholder="Enter first name"
              {...register("firstName")}
              defaultValue={user?.first_name}
            // error={errors.password?.message}
            // value={passwordInput}
            />
          </div>
        </div>
        <hr className="mx-3" />
        <div className="flex h-16 p-3">
          <div className="flex w-40">
            <span>Last name</span>
          </div>
          <div className="flex grow">
            <Input
              containerClassName="w-full"
              fullHeight
              type="text"
              id="lastName"
              placeholder="Enter last name"
              {...register("lastName")}
              defaultValue={user?.last_name}
            // error={errors.lname?.message}
            //value={passwordInput}
            />
          </div>
        </div>
        <hr className="mx-3" />
        <div className="flex h-16 p-3 ">
          <div className="flex w-40">
            <span>Email Address</span>
          </div>
          <div className="flex grow">
            <Input
              containerClassName="w-full"
              fullHeight
              type="text"
              id="email"
              placeholder="Enter Email address"
              {...register("email")}
              defaultValue={user?.email}
            //error={errors.email?.message}
            //value={passwordInput}
            />
          </div>
        </div>
        <hr className="mx-3" />
        <div className="flex h-16 p-3 ">
          <div className="flex w-40">
            <span>Phone Number</span>
          </div>
          <div className="flex grow">
            <Input
              containerClassName="w-full"
              fullHeight
              type="text"
              id="phone"
              placeholder="Phone Number"
              {...register("phone")}
              defaultValue={user?.phone}
            //error={errors.phone?.message}
            //value={passwordInput}
            />
          </div>
        </div>
        <hr className="mx-3" />
        <div className="flex h-16 p-3 ">
          <div className="flex w-40">
            <span>Title</span>
          </div>
          <div className="flex grow">
            <Input
              containerClassName="w-full"
              fullHeight
              type="text"
              id="title"
              placeholder="Title"
              {...register("title")}
              defaultValue={user?.position_in_organization}
            //error={errors.title?.message}
            //value={passwordInput}
            />
          </div>
        </div>
        <hr className="mx-3" />
        <div className="flex h-16 p-3 ">
          <div className="flex w-40">
            <span>Organization</span>
          </div>
          <div className="flex grow">
            <Input
              containerClassName="w-full"
              fullHeight
              type="text"
              id="organization"
              placeholder="Organization"
              {...register("organization")}
              defaultValue={user?.organization_id}
            // error={errors.organization?.message}
            // value={passwordInput}
            />
          </div>
        </div>
        <hr className="mx-3" />
        <div className="flex h-16 p-3">
          <Button
            variant="tertiary"
          // onClick={() => console.log('pepe')}
          >
            <icons.KeyIcon />
            Change Password
          </Button>
        </div>
        <hr className="mx-3" />
        <div className="flex h-16 p-3">
          <div className="flex w-32 flex-col">
            <span className="text-[#008001]">Active Forms:</span>
            <span className="text-[#CD3533]">Inactive Forms:</span>
          </div>
          <div className="flex flex-col">
            <span>20</span>
            <span>15</span>
          </div>
        </div>
        <hr className="mx-3" />
        <div className="flex h-16 p-3">
          <div className="flex w-32">
            <span>Total Forms:</span>
          </div>
          <div className="flex flex-col">
            <span>20</span>
          </div>
        </div>
        <hr className="mx-3" />
      </div>
    </form>
  );
};
