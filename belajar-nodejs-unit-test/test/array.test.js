test("test array", function() {
   const names =  ["Ade", "Nafil", "Firmansah"];
   expect(names).toContain("Nafil");
   expect(names).toEqual(["Ade", "Nafil", "Firmansah"]);

   const persons = [
       {name: "Ade"}, {name: "Nafil"}
   ];
   expect(persons).toContainEqual({name: "Ade"});
   expect(persons).toEqual([
       {name: "Ade"}, {name: "Nafil"}
   ])
});