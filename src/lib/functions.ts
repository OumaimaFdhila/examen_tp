export default function getTime(time:string) {
    const date = time.split('T')[0].replaceAll('-', '/');
    const timeOnly = time.split('T')[1].slice(0, 5);
    return `${date} ${timeOnly}`
}