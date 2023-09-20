module.exports = {
  message: {
    update:{
      success: "Successfully updated",
      error:"Error updating",
    },
    delete: {
      success: "Successfully deleted",
      error: "Error deleting"
    },
    admin:{
      permissionDenied: "Permission denied",
      createmedia: {
        success: "Media created successfully",
        failure: "Failed to creating media",
        error: "Error creating media",
        titleAlreadyExists: "Title already exists",
      },
      updatemedia: {
        success: "Media updated successfully",
        failure: "Media not found",
        error: "Error updating media",
      },
      deletemedia: {
        success: "Media deleted successfully",
        failure: "Media not found",
        error: "Error deleting media",
      },
      createuser: {
        success: "User created successfully",
        failure: "Failed to creating user",
        error: "Error creating user",
      },
      updateuser: {
        success: "User updated successfully",
        failure: "User not found",
        error: "Error updating user",
      },
      deleteuser: {
        success: "User deleted successfully",
        failure: "User not found",
        error: "Error deleting user",
      }
    },
    login: {
      success: "Login successfull",
      failure: "Login failed",
      existinguser: "User already exists",
      error: "Error logging in",
    },
    signup: {
      success: "Signup successfull",
      failure: "Signup failed",
      existinguser: "User already exists",
      error: "Error signing up",
    },
    user: {
      error: "Error",
      existing: "User already exists",
      notfound: "User not found",
    },
    media: {
      error: "Error",
      existing: "Media already exists",
      notfound: "Media not found",
    },
    category: {
      error: "Error",
      successful: "Category created successfully",
      existing: "Category name already exists",
    },
    genre: {
      error: "Error",
      successful: "Genre created successfully",
      existing: "Genre name already exists",
    },
    mediatype: {
      error: "Error",
      successful: "Mediatype created successfully",
      existing: "Mediatype name already exists",
    }
  }
}