use std::io;

#[derive(thiserror::Error, Debug)]
pub enum MakotoError
{
    #[error("Underlying IOError of type \"{}\": \"{0}\"", .0.kind())]
    IOError(#[from] io::Error)
}

pub type MakotoResult<T> = Result<T, MakotoError>;

#[cfg(test)]
mod tests
{
    use super::*;

    use std::io::{Error, ErrorKind};

    #[test]
    fn test_makoto_io_error_message()
    {
        let io_error: Error = Error::new(ErrorKind::Other, "My IO error!");
        let makoto_error: MakotoError = MakotoError::IOError(io_error);

        assert_eq!(
            makoto_error.to_string(),
            r#"Underlying IOError of type "other error": "My IO error!""#
        )
    }
}