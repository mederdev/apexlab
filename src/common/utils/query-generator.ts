export const queryGenerator = (data, field, type = 'contains') => {
  switch (type) {
    case 'eq': {
      if (data[field]) {
        return {
          [field]: data[field]
        }
      }
      return {}
    }
    case 'contains': {
      if (data[field]) {
        return {
          [field]: {
            $ilike: `${data[field]}%`
          }
        }
      }
      return {}
    }
  }
}
