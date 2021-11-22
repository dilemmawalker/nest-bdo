class Solution {
    public List<List<Integer>> threeSum(int[] arr) {
        List<List<Integer>>ans=new ArrayList<>();
        int n=arr.length;
        Arrays.sort(arr);
        for(int i=0;i<n-2;i++){
            int a=arr[i];
            int sum=a;
            int p1=i+1,p2=n-1;
            if(i==0 || arr[i-1]!=arr[i])
            while(p1<p2){
                int b=arr[p1];
                int c=arr[p2];
                if(b+c==a*(-1)){
                    ArrayList<Integer>temp=new ArrayList<>();
                    temp.add(a);
                    temp.add(b);
                    temp.add(c);
                    if(ans.size()==0)
                    ans.add(temp);
                    else if(ans.get(ans.size()-1).get(1)!=b || ans.get(ans.size()-1).get(2)!=c)
                        ans.add(temp);
                    p1++;
                    p2--;
                }
                else if(b+c>a*-1){
                    p2--;
                }
                else{
                    p1++;
                }
            }
        }
        return ans;
    }
}