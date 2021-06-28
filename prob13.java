class Solution {
    public int romanToInt(String str) {
        int n=str.length();
        int sum=0;
        HashMap<Character,Integer>map=new HashMap<>();
        map.put('I',1);
        map.put('V',5);
        map.put('X',10);
        map.put('L',50);
        map.put('C',100);
        map.put('D',500);
        map.put('M',1000);

        for(int i=0;i<n;i++){
            char ch=str.charAt(i);
            int val=map.get(ch);
            if((i+1)<n){
                int nval=map.get(str.charAt(i+1));
                if(nval>val){
                    sum+=nval-val;
                    i++;
                }
                else{
                    sum+=val;
                }
            }
            else{
                sum+=val;
            }
        }
        return sum;
    }
}