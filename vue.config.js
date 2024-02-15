export const devServer = {
    proxy: {
        '/employee': {
            target: 'http://localhost:8080', // İsteklerin yönlendirileceği hedef URL
            changeOrigin: true,
            pathRewrite: {
                '^/employee': '' // Opsiyonel olarak, URL'yi değiştirebilirsiniz
            }
        }
    }
};
  
