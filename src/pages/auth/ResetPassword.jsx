const handleResetPassword = async () => {

  if (!formData.email || !formData.otp || !formData.new_password) {
    setMessage("All fields required");
    return;
  }

  try {

    setLoading(true);

    const res = await axios.post(
      API.RESET_PASSWORD,   // 👈 IMPORTANT (must be separate API)
      {
        email: formData.email,
        otp: formData.otp,
        new_password: formData.new_password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        transformRequest: [(data) => {
          return new URLSearchParams(data).toString();
        }],
      }
    );

    setLoading(false);

    if (res.data.status === "success") {

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } else {
      setMessage(res.data.message);
    }

  } catch (error) {

    setLoading(false);
    console.log(error);
    setMessage("Server Error");

  }
};