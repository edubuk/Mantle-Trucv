import { CvFormDataType } from "@/forms/CvForm";
import { API_BASE_URL } from "@/main";
import { Cv_resoponse_type } from "@/types";
import { useMutation, useQuery } from "react-query";
//import { useNavigate } from "react-router-dom";

export const useCV = () => {

  const createCV = async (
    formData: CvFormDataType
  ): Promise<Cv_resoponse_type> => {
    const response = await fetch(`${API_BASE_URL}/cv/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Could not create cv at the moment try again latter");
    }
    localStorage.removeItem("step1CvData");
    localStorage.removeItem("step2CvData");
    localStorage.removeItem("step3CvData");
    localStorage.removeItem("step4CvData");
    localStorage.removeItem("step5CvData");
    localStorage.removeItem("step6CvData");
    localStorage.removeItem("currentStep");
    localStorage.removeItem("educationSelectedQualifications");
    localStorage.removeItem("isFreeCoupon");
    localStorage.removeItem("nanoId");
    localStorage.removeItem("qualificationAnswered");
    localStorage.removeItem("hashArray");
    localStorage.removeItem("txStatus");
    return response.json();
  };

  const {
    mutateAsync: createCVInBackend,
    isLoading,
    data,
  } = useMutation(createCV, {
    onSuccess: (data) => {
      if (data && data._id) {
        const { _id: id } = data;
        window.location.href = `/cv/${id}`
      }
    },
  });

  // if (isSuccess) {
  //   const { _id: id } = data;
  //   navigate(`/cv/${id}`);
  // }

  return { createCVInBackend, isLoading, data };
};

export const useGetCv = (id: string) => {
  const getCvRequest = async (): Promise<Cv_resoponse_type> => {
    const response = await fetch(`${API_BASE_URL}/cv/getCv/${id}`);
    if (!response.ok) {
      throw new Error("Could not get cv!");
    }
    return response.json();
  };
  const { data: cvData, isLoading } = useQuery(["getCv", id], getCvRequest);

  return { cvData, isLoading };
};
