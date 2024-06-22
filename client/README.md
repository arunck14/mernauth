1.add bcryptjs to handle encryption , if we use just bcrypt we need to handle async await.
const hashedPassword = await bcryptjs.hashSync(password,10);

2.FOR CORS make changes in vite.config

export default defineConfig({
plugins: [react()],
//add this proxy to handle two different port for frontend and backend
server : {
proxy:{
'/api' : {
target : 'http://localhost:3000',
// changeOrigin :true,
secure : false,
}
}

}
})

3. add this to handle 404 error if we don't use axios and use fetch
   const res = await fetch("/api/auth/signup", {
   method: "POST",
   headers: {
   "Content-Type": "application/json",
   },
   body: JSON.stringify(formData),
   });

4 for axios try and catch works but for fetch it doens't work prper
so we can do something like data.error check
