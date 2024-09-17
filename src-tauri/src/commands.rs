use tauri::AppHandle;

use crate::{
	constants, error::{MakotoError, MakotoResult}, state::{config::MakotoConfig, data::MakotoData, MakotoState}
};

#[tauri::command(rename_all = "snake_case")]
pub fn try_deserialize_state_from_disk(
	app: AppHandle,
	create_if_does_not_exist: bool
) -> MakotoResult<MakotoState> {
	let data_file_path = app
		.path_resolver()
		.app_data_dir()
		.ok_or(MakotoError::FailedToGetPath(
			"app data dir".into()
		))?
		.join(constants::DATA_FILE_NAME);

	let data = MakotoData::try_deserialize_from_data(
		&data_file_path,
		create_if_does_not_exist
	)?;

	let config_file_path = app
		.path_resolver()
		.app_config_dir()
		.ok_or(MakotoError::FailedToGetPath(
			"app config dir".into()
		))?
		.join(constants::CONFIG_FILE_NAME);

	let config = MakotoConfig::try_deserialize_from_config(
		&config_file_path,
		create_if_does_not_exist
	)?;

	return Ok(MakotoState { config, data });
}

#[tauri::command(rename_all = "snake_case")]
pub fn try_serialize_state_to_disk(
	app: AppHandle,
	state: MakotoState
) -> MakotoResult<()> {
	let data_file_path = app
		.path_resolver()
		.app_data_dir()
		.ok_or(MakotoError::FailedToGetPath(
			"app data dir".into()
		))?
		.join(constants::DATA_FILE_NAME);

	state.data.try_serialize_to_data(&data_file_path)?;

	let config_file_path = app
		.path_resolver()
		.app_config_dir()
		.ok_or(MakotoError::FailedToGetPath(
			"app config dir".into()
		))?
		.join(constants::CONFIG_FILE_NAME);

	return Ok(state.config.try_serialize_to_config(&config_file_path)?);
}
