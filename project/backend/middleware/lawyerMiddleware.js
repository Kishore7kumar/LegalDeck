const lawyerAuth = (req, res, next) => {
    if (req.user && req.user.isLawyer) {
      next(); // Proceed if the user is a lawyer
    } else {
      res.status(403).json({ message: 'Access denied. Lawyers only.' });
    }
  };
  
  export { lawyerAuth };
  