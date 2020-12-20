class Solution {
    public String convert(String str, int n) {
        String[]arr=new String[n];
        for(int i=0;i<n;i++){
            arr[i]="";
        }
        int idx=0;
        while(idx<str.length()){
            int i=0;
            while(i<n && idx<str.length()){
                arr[i]+=str.charAt(idx);
                idx++;
                i++;
            }
            i=n-2;
            while(idx<str.length() && i>0){
                arr[i]+=str.charAt(idx);
                idx++;
                i--;
            }
        }
        String ans="";
        for(int i=0;i<n;i++){
            ans+=arr[i];
        }
        return ans;
    }
}