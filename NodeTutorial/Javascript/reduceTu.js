const student = ["홍길동", "이서연", "안은영"];
const eng = [40, 90, 20];
const math = [50, 70, 30];
const kor = [100, 50, 60];
const result = Array(3).fill().reduce((prev, cur, idx) => {
    prev[idx] = eng[idx] + math[idx] + kor[idx];
    return prev;
}, [])
const average = Array(3).fill().reduce((prev, cur, idx) => {
    prev[idx] = Math.ceil(result[idx] / result.length);
    return prev;
}, [])
const category = ["student", "eng", "math", "kor", "result", "average"]
const categoryData = [student, eng, math, kor, result, average];
categoryData.forEach
console.log(categoryData)
for (let i = 0; i < student.length; i++) {
    const PersonInfo = category.reduce((prev, cur, curidx, arry) => {
        prev[`${cur}`] = categoryData[curidx][i]
        return prev
    }, {})
    console.log(PersonInfo);
}
