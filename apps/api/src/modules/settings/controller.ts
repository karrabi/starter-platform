getGroup = async (req, res, next) => {
  try {
    const result = await this.service.getGroup(req.params.group);

    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
};

updateGroup = async (req, res, next) => {
  try {
    const result = await this.service.updateGroup(
      req.params.group,
      req.body.value,
    );

    ApiResponse.success(res, result, "Settings updated");
  } catch (error) {
    next(error);
  }
};
